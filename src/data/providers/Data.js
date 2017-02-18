import * as DataApi from '../clients/DataApi';
import * as PortfolioProvider from '../providers/Portfolio';
import FiltersCaster from '../casters/FiltersCaster';
import _ from 'lodash';


export const filtersApply = (filters, stats, details) => {
	let isPortfolio = false;
	filters.filters = FiltersCaster.format(filters.filters);

	if(_.isArray(filters.filters)){
		filters.filters.push({
			name: 'actual',
			value: [true]
		});
	}

	filters.filters.forEach(filter=>{
		if(filter.name === 'portfolio') {
			console.log(filter)
			isPortfolio = true;
		}
	});

	let promises = [
		DataApi.filtersApply(filters, stats, details),
	];
	if(isPortfolio){
		promises.push(PortfolioProvider.getIsinsByDate(filters.date))
	}

	return Promise.all(promises)
	.then(([filters, portfolio]) => {
		let isins = filters.result;
		if(portfolio && portfolio.length) {
			isins = _.intersection(isins, portfolio);
			filters = {...filters, result: isins}
		}
		if(filters.stats) {
			return {
				...filters,
				stats: FiltersCaster.cast(filters.stats)
			};
		}
		return filters;
	});
};


export const getBondsInfo = (isins) => {
	return DataApi.getBondsInfo(isins);
};

export const getBondsDaily = (isins, date, attrs) => {
	return DataApi.getBondsDaily(isins, date, attrs);
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
