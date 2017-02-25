import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';


export const layerFilterBonds = (id, filtersToRequest, filtersToStore, needStatsFromFilters) => async (dispatch) => {
  dispatch({
    type: actionTypes.LAYER_FILTERS_CHANGE,
    id,
    filters: filtersToStore
  });
  let response = await DataProvider.filtersApply(filtersToRequest, needStatsFromFilters);
  dispatch({
    type: actionTypes.LAYER_FILTERS_ISINS_CHANGE,
    id,
    isins: response.result,
    stats: response.stats
  });
  dispatch({
    type: actionTypes.LAYER_ISINS_BY_QUOTA_UPDATE,
    id
  });
  dispatch({
    type: actionTypes.ALL_LAYERS_ISINS_UPDATE
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
