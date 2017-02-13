import { actionTypes as types, urls } from '../constants'

export const addLayer = () => (dispatch, getState) => {
  dispatch({ type: types.ADD_LAYER })
}

export const deleteLayer = (id) => (dispatch, getState) => {
  dispatch({ type: types.DELETE_LAYER, id})
}

export const activateLayer = (id) => (dispatch, getState) => {
  dispatch({ type: types.ACTIVATE_LAYER, id})
}

export const renameLayer = (id, name) => (dispatch, getState) => {
  dispatch({ type: types.RENAME_LAYER, id, name})
}

export const changeLayerView = (id, viewMode) => (dispatch, getState) => {
  dispatch({ type: types.CHANGE_LAYER_VIEW, id, viewMode})
}

export const changeFilter = (filters) => (dispatch, getState) => {
  dispatch({ type: types.CHANGE_FILTER, filters})
}
