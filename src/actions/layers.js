import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';
import * as SearchProvider from '../data/providers/Search';
import { omitBy } from 'lodash';


export const addSet = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ADD_SET
  });
  const currentIds = getState().reports.market.layers.ids;
  dispatch({
    type: actionTypes.ACTIVATE_LAYER,
    id: currentIds[currentIds.length - 1]
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
  let activeLayerId = getState().reports.market.activeLayerId;
  if(id === activeLayerId) {
    let newActiveLayerId = getState().reports.market.layers.ids[0];
    dispatch({
      type: actionTypes.ACTIVATE_LAYER,
      id: newActiveLayerId
    });
  }
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
  // TODO inefficient! call only visible isins update on viewMode change
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

export const initLayers = () => async (dispatch, getState) => {
  const state = getState();
  const date = state.summary.today;
  const report = state.reports.market;
  preformLayers(report, date, dispatch);
};

const preformLayers = async (report, date, dispatch) => {
  let setsToPreform = omitBy(report.layers.layersById, layer => {
    return layer.source.method !== 'set'
  });
  let promises = [];

  for(const key in setsToPreform) {
    dispatch({type: actionTypes.LAYER_AUTO_NAME_UPDATE, id: key });
    const layerSet = setsToPreform[key];
    const id = key;

    if(Object.keys(layerSet.source.filters).length !== 0 ) {
      const filters = {
        filters: layerSet.source.filters,
        date: date
      }
      let { result, stats } = await DataProvider.filtersApply(filters, true);
      dispatch({ type: actionTypes.LAYER_FILTERS_ISINS_CHANGE, id, isins: result, stats: stats });
    }
    if(layerSet.source.search.query.length >= 3) {
      const query = layerSet.source.search.query
      let searchBonds = await SearchProvider.searchBonds(query, date);
      let isins = searchBonds.map((bond)=>{return bond.isin});

      dispatch({ type: actionTypes.LAYER_SEARCH_ISINS_CHANGE, id, isins });
    }

    dispatch({ type: actionTypes.LAYER_ISINS_BY_QUOTA_UPDATE, id });
    dispatch({ type: actionTypes.ALL_LAYERS_ISINS_UPDATE });
    }
}
