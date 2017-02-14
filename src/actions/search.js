import { actionTypes as types, urls } from '../constants';

export const searchBond = (id) => (dispatch, getState) => {
  dispatch({ type: types.SEARCH_BOND, id: id })
};
