import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';

const SEARCH_LIMIT = 200;
const SEARCH_FIELDS = ['maturityDate', 'finalDate', 'issueDate', 'status'];

export const searchRequest = (id, query) => async (dispatch) => {
  dispatch({ type: actionTypes.SEARCH_REQUEST });

  try {
    const data = await SearchProvider.search(query, SEARCH_LIMIT, SEARCH_FIELDS);
    dispatch({ type: actionTypes.SEARCH_RESPONSE, id, data })
  }
  catch (resp) {
    dispatch({ type: actionTypes.SEARCH_RESPONSE, id, data })
  }
};
