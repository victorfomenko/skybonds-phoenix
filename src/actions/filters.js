import { actionTypes } from './actionTypes';

export const changeFilters = (id, filters) => (dispatch) => {
  dispatch({ type: actionTypes.FILTERS_CHANGE, id: id, filters: filters});
};

export const changeFiltersIsins = (id, isins) => (dispatch) => {
  dispatch({ type: actionTypes.FILTERS_ISINS_CHANGE, id: id, isins: isins});
};