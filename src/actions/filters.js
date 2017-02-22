import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';


export const layerFilterBonds = (id, filters, needStatsFromFilters) => async (dispatch) => {
  let response = await DataProvider.filtersApply(filters, needStatsFromFilters);
  dispatch({
    type: actionTypes.LAYER_FILTERS_ISINS_CHANGE,
    id,
    isins: response.result,
    stats: response.stats
  });
};

export const layerGetFilterStats = (id, filters, isins) => async (dispatch) => {
  let stats = await DataProvider.filtersStats(filters, isins);
  dispatch({
    type: actionTypes.LAYER_FILTERS_STATS_CHANGE,
    id,
    stats: stats
  });
};

export const changeFilters = (id, filters) => (dispatch) => {
  dispatch({
    type: actionTypes.LAYER_FILTERS_CHANGE,
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
