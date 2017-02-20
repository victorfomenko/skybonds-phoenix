import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';
import * as DataProvider from '../data/providers/Data';


export const homeSearchRequest = (query, date) => async (dispatch) => {
  dispatch({ type: actionTypes.HOME_SEARCH_REQUEST });
  try {
    let bonds = await SearchProvider.search(query, date);
    dispatch({
      type: actionTypes.HOME_SEARCH_RESPONSE,
      query,
      bonds
    });

    bonds = await DataProvider.getBondsDailyForSearch(bonds, date);
    dispatch({
      type: actionTypes.HOME_SEARCH_DAILY,
      bonds
    });
  }
  catch (response) {
    dispatch({
      type: actionTypes.HOME_SEARCH_RESPONSE,
      response
    });
  }
};
