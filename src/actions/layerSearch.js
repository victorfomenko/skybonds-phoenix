import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';


export const layerSearchBonds = (id, query, date) => async (dispatch) => {
  dispatch({
    type: actionTypes.LAYER_SEARCH_REQUEST
  });
  try {
    // TODO FIX THAT DAMN SILENT CODE FAILING WHEN WE MISS THAT DAMN 'LET' ON THE NEXT LINE
    let searchBonds = await SearchProvider.searchBonds(query, date);
    let isins = searchBonds.map((bond)=>{return bond.isin});
    dispatch({
      type: actionTypes.LAYER_SEARCH_ISINS_CHANGE,
      id,
      query,
      isins
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
