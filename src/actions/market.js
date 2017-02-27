import { actionTypes } from './actionTypes';
import * as SpacesProvider from '../data/providers/Spaces';
import { getEmptyMarketReport } from '../data/helpers';

export const loadReports = (reportID, date) => async (dispatch) => {

  dispatch({ type: actionTypes.MARKET_REPORTS_FETCH_REQUEST });

  try {
    let { orderVersion, spaces } = await SpacesProvider.getList();
    let ids = spaces.map(item => { return item.id });
    dispatch({type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion});

    let reports = await SpacesProvider.getMarketSpacesByIds(ids);

    if(reports.length === 0) {
      let { id, orderVersion } = await addDefaultMarketSpace(date);
      dispatch({type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion});
      reports = await SpacesProvider.getSpaceById(id).then(space => {return [space] })
    }

    dispatch({type: actionTypes.MARKET_REPORTS_FETCH_SUCCESS, reports, reportID});
  }
  catch(error) {
  	console.log('catch', error)
    dispatch({ type: actionTypes.MARKET_REPORTS_FETCH_FAILED, data: error });
  }
};

const addDefaultMarketSpace = (date) => {
  const report = getEmptyMarketReport();
  report.ui.extensions.calendar.date = date;
  return SpacesProvider.add(report)
}
