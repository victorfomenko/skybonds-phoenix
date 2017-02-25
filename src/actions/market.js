import { actionTypes } from './actionTypes';
import { getMarketSpaces } from '../data/providers/Spaces';

export const loadReports = (reportID) => async (dispatch) => {

  dispatch({ type: actionTypes.MARKET_REPORTS_FETCH_REQUEST });

  try {
    const reports = await getMarketSpaces();
    dispatch({type: actionTypes.MARKET_REPORTS_FETCH_SUCCESS, reports, reportID});
  }
  catch(error) {
  	console.log('catch', error)
    dispatch({ type: actionTypes.MARKET_REPORTS_FETCH_FAILED, data: error });
  }
};
