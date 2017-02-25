import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';


export const layerSearchQueryChange = (id, query) => (dispatch) => {
  dispatch({
    type: actionTypes.LAYER_SEARCH_QUERY_CHANGE,
    id,
    query
  });
};

export const layerSearchRequest = (id, query, date) => async (dispatch) => {
  try {
    // TODO FIX THAT DAMN SILENT CODE FAILING WHEN WE MISS THAT DAMN 'LET' ON THE NEXT LINE
    let searchBonds = await SearchProvider.searchBonds(query, date);
    let isins = searchBonds.map((bond)=>{return bond.isin});
    dispatch({
      type: actionTypes.LAYER_SEARCH_ISINS_CHANGE,
      id,
      isins
    });
    dispatch({
      type: actionTypes.LAYER_ISINS_BY_QUOTA_UPDATE,
      id
    });
    dispatch({
      type: actionTypes.ALL_LAYERS_ISINS_UPDATE
    });
  }
  catch (response) {
    dispatch({
      type: actionTypes.LAYER_SEARCH_ERROR,
      id,
      response
    });
  }
};
