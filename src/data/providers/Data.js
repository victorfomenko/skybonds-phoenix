import * as DataApi from '../clients/DataApi';


export const filtersApply = (filters, stats, details) => {
	return DataApi.filtersApply(filters, stats, details)
}

export const getBondsInfo = (isins) => {
	return DataApi.getBondsInfo(isins)
}

export const getBondsDaily = (isins, date, attrs) => {
	return DataApi.getBondsDaily(isins, date, attrs)
}
