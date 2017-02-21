import * as DataApi from '../clients/DataApi';
import * as PortfolioProvider from '../providers/Portfolio';
import FiltersCaster from '../casters/FiltersCaster';
import { keyBy, map, isArray, intersection } from 'lodash';


export const filtersApply = (filters, stats, details) => {
	let isPortfolio = false;
	filters.filters = FiltersCaster.format(filters.filters);

	filters.filters.forEach(filter=>{
		if(filter.name === 'portfolio') {
			isPortfolio = true;
		}
	});

	if(isArray(filters.filters) && filters.filters.length){
		filters.filters.push({
			name: 'actual',
			value: [true]
		});
	}

	let promises = [];
	if(filters.filters.length) {
		promises.push(DataApi.filtersApply(filters, stats, details))
	}
	if(isPortfolio){
		promises.push(PortfolioProvider.getIsinsByDate(filters.date))
	}

	return Promise.all(promises)
	.then((responses) => {
		let details = []
        let stats = []
        responses = responses.map(resp=> {
        	if(resp.result != null) {
        		details = resp.details || []
        		stats = FiltersCaster.cast(resp.stats) || []
        		return resp.result
        	}
        	return resp
        })
		const isins = intersection.apply(_, responses);
		return {
			result: isins,
			details,
			stats,
		};
	});
};


export const getBondsInfo = (isins, attrs) => {
	return DataApi.getBondsInfo(isins, attrs);
};

export const getBondsDaily = (isins, date, attrs) => {
	return DataApi.getBondsDaily(isins, date, attrs);
};

export const getBondsDailyForSearch = async (bonds, date) => {
  if(bonds.length == 0) {
    return bonds;
  }
  const isins = bonds.map((bond)=> { return bond.isin });
  const DAILY_ATTRS = ['yield', 'duration'];
  let dailyData = await DataApi.getBondsDaily(isins, date, DAILY_ATTRS);
  let dailyDataMap = keyBy(dailyData, 'isin');
  return bonds.map((bond)=>{
    bond.daily = dailyDataMap[bond.isin].data || {};
    return bond
  });
};

export const getPlaceholderBondsForSearch = async (isins, date) => {
  const INFO_ATTRS = ['issuerId', 'issuer', 'standardName', 'ratingGroup', 'ccy'];
  const DAILY_ATTRS = ['yield', 'duration'];
  return Promise.all([
    DataApi.getBondsInfo(isins, INFO_ATTRS),
    DataApi.getBondsDaily(isins, date, DAILY_ATTRS)
  ]).then((response)=>{
    let infoDataMap = keyBy(response[0], 'isin');
    let dailyDataMap = keyBy(response[1], 'isin');
    return isins.map((isin)=>{
      return {
        isin: isin,
        info: infoDataMap[isin].data || {},
        daily: dailyDataMap[isin].data || {}
      }
    });
  });
};

export const getIssuersInfo = (ids, attrs) => {
  return DataApi.getIssuersInfo(ids, attrs);
};

export const getRepayment = (isin) => {
  return DataApi.getRepayment(isin);
};

export const getPutDates = (isin) => {
  return DataApi.getPutDates(isin);
};

export const getCallDates = (isin) => {
  return DataApi.getCallDates(isin);
};

export const getRates = (isin) => {
  return DataApi.getCallDates(isin);
};
