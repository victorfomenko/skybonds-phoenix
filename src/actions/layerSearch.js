import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';
import * as DataProvider from '../data/providers/Data';


export const layerSearchBonds = (id, query, date, filtersIsins) => async (dispatch) => {
  dispatch({
    type: actionTypes.LAYER_SEARCH_REQUEST
  });
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

export const layerGetPlaceholderBonds = (id, isins, date) => async (dispatch) => {
  let placeholderBonds = await DataProvider.getPlaceholderBondsForSearch(isins, date);
  dispatch({
    type: actionTypes.LAYER_GET_PLACEHOLDER_BONDS,
    id,
    placeholderBonds
  });
};
