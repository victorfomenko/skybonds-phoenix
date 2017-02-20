import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';
import * as DataProvider from '../data/providers/Data';


export const layerSearchRequest = (id, query, date, filtersIsins) => async (dispatch) => {
  dispatch({ type: actionTypes.LAYER_SEARCH_REQUEST });
  try {
    let bonds = await SearchProvider.searchBondsAndFilter(query, date, filtersIsins);
    dispatch({
      type: actionTypes.LAYER_SEARCH_RESPONSE,
      id,
      query,
      bonds
    });

    bonds = await DataProvider.getBondsDailyForSearch(bonds, date);
    dispatch({
      type: actionTypes.LAYER_SEARCH_DAILY,
      id,
      bonds
    });
  }
  catch (response) {
    dispatch({
      type: actionTypes.LAYER_SEARCH_RESPONSE,
      id,
      response
    });
  }
};
