import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';


export const addSet = () => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_SET
  });
};

export const addSpread = () => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_SPREAD
  });
};

export const removeLayer = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_LAYER,
    id
  });
  const ativeLayerId = getState().reports.market.layers.ids[0]
  dispatch({
    type: actionTypes.ACTIVATE_LAYER,
    id: ativeLayerId
  });
  dispatch({
    type: actionTypes.ALL_LAYERS_ISINS_UPDATE
  });
};

export const activateLayer = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.ACTIVATE_LAYER,
    id
  });
};

export const renameLayer = (id, name) => (dispatch) => {
  dispatch({ type: actionTypes.RENAME_LAYER, id, name});
};

export const changeLayerViewMode = (id, viewMode) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_LAYER_VIEW,
    id,
    viewMode
  });
  dispatch({
    type: actionTypes.ALL_LAYERS_ISINS_UPDATE
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
