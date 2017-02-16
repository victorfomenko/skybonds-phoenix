import * as SearchApi from '../clients/SearchApi';

export const search = (query, limit, attrs) => {
	return SearchApi.search(query, limit, attrs);
};
