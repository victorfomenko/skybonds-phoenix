import { actionTypes } from '../../actions/actionTypes';
import { omit } from 'lodash';
import { getEmptyReports } from '../../data/helpers/defaultStructures';

const initState = getEmptyReports();

const all = (state = initState, action) => {
  switch (action.type) {

    case actionTypes.REPORTS_UPDATE_ORDER_VERSION:
      return {
        ...state,
        orderVersion: action.orderVersion
      }

    case actionTypes.REPORTS_FETCH_REQUEST:
      return {
        ...initState,
        pending: true
      }

    case actionTypes.REPORTS_FETCH_SUCCESS:
      let reportsById = {};
      action.reports.forEach(report=> {
        reportsById[report.id] = report;
      })
      return {
        ...state,
        ids: action.ids,
        reportsById: reportsById,
        pending: false
      }

    case actionTypes.REPORTS_FETCH_FAILED:
      return {
        ...initState,
        pending: false,
        error: true
      }

    case actionTypes.REPORT_ADD:
      return {
        ...state,
        ids: [
          ...state.ids,
          action.report.id
        ],
        reportsById: {
          ...state.reportsById,
          [action.report.id]: action.report
        },
        pending: false
      }

    case actionTypes.REPORT_DELETE:
      return {
        ...state,
        ids: state.ids.filter(id => { return id !== action.id }),
        reportsById: omit(state.reportsById, action.id)
      }

    default:
      return state;
  }
};

export default all;
