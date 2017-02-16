import { actionTypes } from './actionTypes';

export const addLayer = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.ADD_LAYER })
};

export const deleteLayer = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.DELETE_LAYER, id})
};

export const activateLayer = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.ACTIVATE_LAYER, id})
};

export const renameLayer = (id, name) => (dispatch, getState) => {
  dispatch({ type: actionTypes.RENAME_LAYER, id, name})
};

export const changeLayerView = (id, viewMode) => (dispatch, getState) => {
  dispatch({ type: actionTypes.CHANGE_LAYER_VIEW, id, viewMode})
};