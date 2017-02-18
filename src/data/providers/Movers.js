import * as DataApi from '../clients/DataApi';
import * as PortfolioApi from '../clients/PortfolioApi';
import NumberCaster from '../casters/NumberCaster';
import {sortBy} from 'lodash';

const moversLimitList = 5;
const INFO_FIELDS = ['standardName'];
const DAILY_FIELDS = ['yield', 'price', 'spreadToBMK'];

export const loadMovers = ({isins, startDate, endDate, paramName}) => {
	let moversData = {};
	return DataApi.getMovers(isins, startDate, endDate, paramName)
	.then(resp => {
		if(!!resp.error) return Promise.reject(resp);
		let map = {};
	    let results = [];
	    for (let isin of isins) {
	      map[isin] = true;
	    }
	    for (let item of resp) {
	      if ((item != null ? item.isin : void 0) && map.hasOwnProperty(item.isin)) {
	        results.push({
	          isin: item.isin,
	          change: NumberCaster.cast(item.change)
	        });
	      }
	    }

	    results = sortBy(results, ['change']);
	    const increase = results.slice(-moversLimitList).filter(function(value) {
	      return value['change'] >= 0;
	    }).reverse();

	    const decrease = results.slice(0, moversLimitList).filter(function(value) {
	      return value['change'] <= 0;
	    });

	    for (let item of decrease) {
	    	moversData[item.isin] = { moverType: 'decrease', change: item.change };
	    }
	    for (let item of increase) {
	    	moversData[item.isin] = { moverType: 'increase', change: item.change };
	    }
	    return Promise.all([
	    	DataApi.getBondsInfo(Object.keys(moversData), INFO_FIELDS),
	    	DataApi.getBondsDaily(Object.keys(moversData), endDate, DAILY_FIELDS),
	    	PortfolioApi.getQuantityByDate(endDate)
	    ]);
	})
	.then(resp => {
		if(!!resp.error) return Promise.reject(resp);
    for (let staticItem of resp[0]) {
      moversData[staticItem.isin].isin = staticItem.isin;
      moversData[staticItem.isin].staticData = staticItem.data;
    }
    for (let dailyItem of resp[1]) {
      moversData[dailyItem.isin].dailyData = dailyItem.data;
    }
    for (let portfolioItem of resp[2]) {
			if(moversData[portfolioItem.isin]) {
				moversData[portfolioItem.isin].inBondPortfolio = true;
			}
    }
		return moversData;
	})
	.catch(error => {
		return Promise.reject(error);
	});
};
