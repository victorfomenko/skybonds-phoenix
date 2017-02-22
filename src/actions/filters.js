import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';

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

export const changeLayersBonds = (id, isins, date) => async (dispatch) => {
  let layerBonds = await DataProvider.getLayerBondsData(isins, date);
  dispatch({
    type: actionTypes.LAYER_BONDS_UPDATE,
    id,
    bonds: layerBonds
  });
};


