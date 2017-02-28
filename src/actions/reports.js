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

export const selectReport = (id) => (dispatch, getState) => {
  const state = getState();
  const report = state.reports.all.reportsById[id];
  dispatch({type: actionTypes.MARKET_REPORT_UPDATE, report});
}

export const renameReport = (id, name) => async (dispatch, getState) => {
  // update report
  try {
    const state = getState();
    const { version, orderVersion } = await SpacesProvider.update(state.reports.all.reportsById[id], state.summary.today);
    dispatch({ type: actionTypes.REPORT_RENAME, id, name, version });
    dispatch({ type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion });
  } catch(error) {
    console.warn(error);
    dispatch({ type: actionTypes.REPORT_UPDATE_FAILURE, data: error });
  }
}

export const removeReport = (id) => async (dispatch, getState) => {
  let state = getState();
  const activeReportId = state.reports.market.id;
  const date = state.summary.today;
  let report = state.reports.all.reportsById[id];

  try {
    const { orderVersion, status } = await SpacesProvider.remove(id);
    dispatch({type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion});
    dispatch({type: actionTypes.REPORT_DELETE, id});
    if(getState().reports.all.ids.length === 0 ) {
      let { id, orderVersion } = await addDefaultMarketSpace(date);
      dispatch({type: actionTypes.REPORTS_UPDATE_ORDER_VERSION, orderVersion});
      report = await SpacesProvider.getSpaceById(id);
      dispatch({type: actionTypes.REPORT_ADD, report});
    }
  }
  catch(error) {
   console.warn(error);
  }

  state = getState();
  if(state.reports.all.reportsById[id]) {
    report = state.reports.all.reportsById[id]
  }
  else {
    const lastReportId = state.reports.all.ids[state.reports.all.ids.length-1];
    report = state.reports.all.reportsById[lastReportId]
  }

  dispatch({type: actionTypes.MARKET_REPORT_UPDATE, report});
  return report.id
}


const addDefaultMarketSpace = (date) => {
  const report = getEmptyMarketReport();
  report.ui.extensions.calendar.date = date;
  return SpacesProvider.add(report)
}
