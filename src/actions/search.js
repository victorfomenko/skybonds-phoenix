import { actionTypes } from './actionTypes';

export const searchChange = (id) => (dispatch, getState) => {
  dispatch({ type: types.SEARCH_BOND, id: id })
};
