import { actionTypes } from './actionTypes';

export const changeFilters = (id, filters) => (dispatch) => {
  dispatch({
    type: actionTypes.FILTERS_CHANGE,
    id,
    filters
  });
};

export const changeFiltersIsins = (id, isins) => (dispatch) => {
  dispatch({
    type: actionTypes.LAYER_FILTERS_ISINS_CHANGE,
    id,
    isins
  });
};
