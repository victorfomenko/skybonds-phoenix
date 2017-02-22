import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';
import * as DataProvider from '../data/providers/Data';


export const layerSearchBonds = (id, query, date, filtersIsins) => async (dispatch) => {
  dispatch({
    type: actionTypes.LAYER_SEARCH_REQUEST
  });
  try {
    let searchBonds = await SearchProvider.searchBonds(query, date);
    let isins = searchBonds.map((bond)=>{return bond.isin});
    dispatch({
      type: actionTypes.LAYER_SEARCH_ISINS_CHANGE,
      id,
      query,
      isins
    });

    // TODO FIX THAT DAMN SILENT CODE FAILING UNLESS WE HAVE THATH DAMN 'LET' ON THE NEXT LINE
    let layerBonds = await DataProvider.getLayerBondsData(isins, date);
    dispatch({
      type: actionTypes.LAYER_BONDS_UPDATE,
      id,
      bonds: layerBonds
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
