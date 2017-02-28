import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';
import * as SpacesProvider from '../data/providers/Spaces';


export const layerSearchQueryChange = (id, query) => (dispatch) => {
  dispatch({
    type: actionTypes.LAYER_SEARCH_QUERY_CHANGE,
    id,
    query
  });
  dispatch({
    type: actionTypes.LAYER_AUTO_NAME_UPDATE,
    id
  });
};

export const layerSearchRequest = (id, query, date) => async (dispatch, getState) => {
  // TODO FIX THAT DAMN SILENT CODE FAILING WHEN WE MISS THAT DAMN 'LET' ON THE NEXT LINE
  let searchBonds = await SearchProvider.searchBonds(query, date);
  let isins = searchBonds.map((bond)=>{return bond.isin});
  dispatch({ type: actionTypes.LAYER_SEARCH_ISINS_CHANGE, id, isins });
  dispatch({ type: actionTypes.LAYER_ISINS_BY_QUOTA_UPDATE, id });
  dispatch({ type: actionTypes.ALL_LAYERS_ISINS_UPDATE });

  // update report
  try {
    const state = getState();
    const { version, orderVersion } = await SpacesProvider.update(state.reports.market, state.summary.today);
    dispatch({ type: actionTypes.REPORT_UPDATE_SUCCESS, version, id: state.reports.market.id });
    dispatch({ type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion });
  } catch(error) {
    console.warn(error);
    dispatch({ type: actionTypes.REPORT_UPDATE_FAILURE, data: error });
  }
};
