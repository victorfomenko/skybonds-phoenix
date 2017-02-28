import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';
import * as SpacesProvider from '../data/providers/Spaces';


export const layerFilterBonds = (id, filtersToRequest, filtersToStore, needStatsFromFilters) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.LAYER_FILTERS_CHANGE, id, filters: filtersToStore });
  dispatch({ type: actionTypes.LAYER_AUTO_NAME_UPDATE, id });


  try {
    let { result, stats } = await DataProvider.filtersApply(filtersToRequest, needStatsFromFilters);
    dispatch({ type: actionTypes.LAYER_FILTERS_ISINS_CHANGE, id, isins: result, stats: stats });
    dispatch({ type: actionTypes.LAYER_ISINS_BY_QUOTA_UPDATE, id });
    dispatch({ type: actionTypes.ALL_LAYERS_ISINS_UPDATE });

    // update
    const state = getState();
    const { version, orderVersion } = await SpacesProvider.update(state.reports.market, state.summary.today);
    dispatch({ type: actionTypes.REPORT_UPDATE_SUCCESS, version, id:  state.reports.market.id});
    dispatch({ type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion });
  }
  catch(error) {
    console.warn(error);
    dispatch({ type: actionTypes.REPORT_UPDATE_FAILURE, data: error });
  }
};

export const layerGetFilterStats = (id, filters, isins) => async (dispatch) => {
  let stats = await DataProvider.filtersStats(filters, isins);
  dispatch({
    type: actionTypes.LAYER_FILTERS_STATS_CHANGE,
    id,
    stats: stats
  });
};
