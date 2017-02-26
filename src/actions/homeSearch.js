import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';
import * as DataProvider from '../data/providers/Data';


export const homeSearchQueryChange = (query) => (dispatch) => {
  dispatch({
    type: actionTypes.HOME_SEARCH_QUERY_CHANGE,
    query
  });
};

export const homeSearchRequest = (query, date) => async (dispatch) => {
  let bonds = await SearchProvider.searchBonds(query, date);
  dispatch({
    type: actionTypes.HOME_SEARCH_RESPONSE,
    bonds
  });

  if(bonds.length > 0) {
    bonds = await DataProvider.getSearchBondsData(bonds, date);
    dispatch({
      type: actionTypes.HOME_SEARCH_DAILY,
      bonds
    });
  }
};
