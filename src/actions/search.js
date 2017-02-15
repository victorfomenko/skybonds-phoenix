import { actionTypes } from './actionTypes';

export const searchChange = (id, query) => (dispatch, getState) => {
  dispatch({ type: actionTypes.SEARCH_BOND, id: id, query: query })
};
