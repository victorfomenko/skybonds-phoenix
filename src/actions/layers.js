import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';


export const addSet = () => (dispatch) => {
  dispatch({ type: actionTypes.ADD_SET });
};

export const addSpread = () => (dispatch) => {
  dispatch({ type: actionTypes.ADD_SPREAD });
};

export const removeLayer = (id) => (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_LAYER, id});
};

export const activateLayer = (id) => (dispatch) => {
  dispatch({ type: actionTypes.ACTIVATE_LAYER, id});
};

export const renameLayer = (id, name) => (dispatch) => {
  dispatch({ type: actionTypes.RENAME_LAYER, id, name});
};

export const changeLayerView = (id, viewMode) => (dispatch) => {
  dispatch({ type: actionTypes.CHANGE_LAYER_VIEW, id, viewMode});
};

export const changeLayersBonds = (id, isins, date) => async (dispatch) => {
  let layerBonds = await DataProvider.getLayerBondsData(isins, date);
  dispatch({
    type: actionTypes.LAYER_BONDS_UPDATE,
    id,
    bonds: layerBonds
  });
};
