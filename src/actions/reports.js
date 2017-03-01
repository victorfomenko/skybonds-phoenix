import { actionTypes } from './actionTypes';
import * as SpacesProvider from '../data/providers/Spaces';
import { getEmptyMarketReport } from '../data/helpers';
import * as DataProvider from '../data/providers/Data';
import { omitBy } from 'lodash';

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
  let toPreform = false;

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
    toPreform = true;
  }

  dispatch({type: actionTypes.MARKET_REPORT_UPDATE, report});
  if(toPreform){
    preformLayers(getState().reports.market, date, dispatch);
  }
  return report.id
}


const addDefaultMarketSpace = (date) => {
  const report = getEmptyMarketReport();
  report.ui.extensions.calendar.date = date;
  return SpacesProvider.add(report)
}

const preformLayers = async (report, date, dispatch) => {
  let setsToPreform = omitBy(report.layers.layersById, layer => {
    return layer.source.method !== 'set'
  });
  let promises = [];

  for(const key in setsToPreform) {
    dispatch({type: actionTypes.LAYER_AUTO_NAME_UPDATE, id: key });

    ((layerSet, id) => {
      if(Object.keys(layerSet.source.filters).length !== 0 ) {
        const filters = {
          filters: layerSet.source.filters,
          date: date
        }
        const applyPromise = DataProvider.filtersApply(filters, true).then(({ result, stats }) => {
          dispatch({ type: actionTypes.LAYER_FILTERS_ISINS_CHANGE, id, isins: result, stats: stats });
          dispatch({ type: actionTypes.LAYER_ISINS_BY_QUOTA_UPDATE, id });
        })
        promises.push(applyPromise);
      }
      if(layerSet.source.search.query.length >= 3) {
        const query = layerSet.source.search.query
        const searchPromise = SearchProvider.searchBonds(query, date).then(searchBonds=>{
          let isins = searchBonds.map((bond)=>{return bond.isin});
          dispatch({ type: actionTypes.LAYER_SEARCH_ISINS_CHANGE, id, isins });
          dispatch({ type: actionTypes.LAYER_ISINS_BY_QUOTA_UPDATE, id });
        })
        promises.push(searchPromise);
      }
    })(setsToPreform[key], key)
  }
  Promise.all(promises).then(()=>{
    dispatch({ type: actionTypes.ALL_LAYERS_ISINS_UPDATE });
  })

}
