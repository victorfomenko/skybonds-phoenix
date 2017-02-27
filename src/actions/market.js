import { actionTypes } from './actionTypes';
import * as SpacesProvider from '../data/providers/Spaces';
import { getEmptyMarketReport } from '../data/helpers';

import { mapValues, omitBy } from 'lodash';

export const prepareMarketReports = (reportID) => async (dispatch, getState) => {
  const state = getState();
  const date = state.summary.today;
  const allReports = state.reports.all;
  let report = {};

  const marketReportsIds = allReports.ids.filter(id => {
    return allReports.reportsById[id].ui.type === 'market'
  })

  if(!marketReportsIds.length) {
    let { id, orderVersion } = await addDefaultMarketSpace();
    report = await SpacesProvider.getSpaceById(id);
    dispatch({type: actionTypes.REPORT_ADD, report});
  }
  else {
    const lastReportId = marketReportsIds[marketReportsIds.length-1];
    report = allReports.reportsById[reportID] ? allReports.reportsById[reportID] : allReports.reportsById[lastReportId]
  }
  dispatch({type: actionTypes.MARKET_REPORT_UPDATE, report});

};

const addDefaultMarketSpace = (date) => {
  const report = getEmptyMarketReport();
  report.ui.extensions.calendar.date = date;
  return SpacesProvider.add(report)
}
