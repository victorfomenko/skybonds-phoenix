import { actionTypes as types, urls } from '../constants';

export const searchChange = (id) => (dispatch, getState) => {
  dispatch({ type: types.SEARCH_BOND, id: id })
};
