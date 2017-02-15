import * as DataApi from '../clients/DataApi';
import FiltersCaster from '../casters/FiltersCaster';
import _ from 'lodash';


export const filtersApply = (filters, stats, details) => {
	filters.filters = FiltersCaster.format(filters.filters)
	if(_.isArray(filters.filters)){
		filters.filters.push({
			name: 'actual',
			value: [true]
		})
	}
	return DataApi.filtersApply(filters, stats, details)
}

export const getBondsInfo = (isins) => {
	return DataApi.getBondsInfo(isins)
}

export const getBondsDaily = (isins, date, attrs) => {
	return DataApi.getBondsDaily(isins, date, attrs)
}
