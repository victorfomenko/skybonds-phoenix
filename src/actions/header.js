import { actionTypes } from './actionTypes';
import * as SpacesProvider from '../data/providers/Spaces';
import { getEmptyMarketReport } from '../data/helpers';
import { isMarketReportEmpty } from '../helpers/isReportEmpty';


export const addReport = () => async (dispatch, getState) => {
  const state = getState();
  const date = state.summary.today;
  const currentReport = state.market;
  if(isMarketReportEmpty(state.reports.market)){ return }
  try {
    let { id, orderVersion } = await addDefaultMarketSpace(date);
    dispatch({type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion});
    const report = await SpacesProvider.getSpaceById(id);
    dispatch({type: actionTypes.REPORT_ADD, report});
    dispatch({type: actionTypes.MARKET_REPORT_UPDATE, report});
  }
  catch(error) {
   console.warn(error);
  }
}

const addDefaultMarketSpace = (date) => {
  const report = getEmptyMarketReport();
  report.ui.extensions.calendar.date = date;
  return SpacesProvider.add(report)
}
