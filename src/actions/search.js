import { actionTypes } from './actionTypes';

export const searchChange = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.SEARCH_BOND, id: id })
};
