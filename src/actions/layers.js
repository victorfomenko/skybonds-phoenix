import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';


export const addLayer = () => (dispatch) => {
  dispatch({ type: actionTypes.ADD_LAYER });
};

export const deleteLayer = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.DELETE_LAYER, id});
  const ativeLayerId = getState().reports.market.layers.ids[0]
  dispatch({ type: actionTypes.ACTIVATE_LAYER, id: ativeLayerId});
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
