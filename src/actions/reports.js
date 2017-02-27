import { actionTypes } from './actionTypes';
import * as SpacesProvider from '../data/providers/Spaces';
import { getEmptyMarketReport } from '../data/helpers';

export const loadAllReports = () => async (dispatch) => {

  dispatch({ type: actionTypes.REPORTS_FETCH_REQUEST });

  try {
    let { orderVersion, spaces } = await SpacesProvider.getList();
    let ids = spaces.map(item => { return item.id });
    dispatch({type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion});

    let reports = await SpacesProvider.getSpacesByIds(ids);
    dispatch({type: actionTypes.REPORTS_FETCH_SUCCESS, ids, reports});
  }
  catch(error) {
    console.log('catch', error)
    dispatch({ type: actionTypes.REPORTS_FETCH_FAILED, data: error });
  }
};
