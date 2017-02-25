import { actionTypes } from '../../../actions/actionTypes';
import { mapValues, uniq } from 'lodash';
import { LAYER_SET_VIEW_MODES } from '../../../data/constants';

import layers from './layers';
import movers from './movers';

const initState = {
  layers: {
    ids: [1],
    layersById: {
      1: {
        source: {
          search: {
            query: '',
            peersFor: []
          },
          filters: {},
          include: [],
          exclude: []
        },
        ui: {
          name : '',
          autoName: 'Empty set',
          viewMode : LAYER_SET_VIEW_MODES.BONDS
        },
        data: {
          search: {
            isins: []
          },
          filters: {
            isins: [],
            stats: []
          },
          isinsAll: [],
          isinsByQuota: [],
          bonds: []
        }
      }
    }
  },
  include: [],
  exclude: [],
  activeLayerId: '1',
  ui: {
    type: 'market',
    spaceName: 'New report',
    viewMode: 'scatterPlot',
  },
  data: {
    allLayersIsinsAll: [],
    allLayersIsinsByQuota: [],
    allLayersIsinsByQuotaVisible: []
  }
};

const getAllLayersIsinsObject = (layersById)=> {
  let result = {
    allLayersIsinsAll: [],
    allLayersIsinsByQuota: [],
    allLayersIsinsByQuotaVisible: []
  };
  mapValues(layersById, (layer) => {
    result.allLayersIsinsAll.push(...layer.data.isinsAll);
    result.allLayersIsinsByQuota.push(...layer.data.isinsByQuota);
    if(layer.ui.viewMode === LAYER_SET_VIEW_MODES.BONDS ||
      layer.ui.viewMode === LAYER_SET_VIEW_MODES.BONDS_AND_CURVES
    ) {
      result.allLayersIsinsByQuotaVisible.push(...layer.data.isinsByQuota);
    }
  });
  result.allLayersIsinsAll = uniq(result.allLayersIsinsAll);
  result.allLayersIsinsByQuota = uniq(result.allLayersIsinsByQuota);
  result.allLayersIsinsByQuotaVisible = uniq(result.allLayersIsinsByQuotaVisible);
  return result;
};

const market = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.MARKET_REPORTS_FETCH_SUCCESS:
      let report = {};
      const reports = action.reports;

      if(typeof action.reportID === 'number') {
        report = reports[action.reportID]
      }
      else {
        report = reports[reports.length-1]
      }

      return {
        ...state,
        ...report,
        layers: layers(report.layers, action),
        movers: movers(state.movers, action)
      };
      break;

    case actionTypes.ACTIVATE_LAYER:
      return {
        ...state,
        activeLayerId: action.id
      };

    case actionTypes.ALL_LAYERS_ISINS_UPDATE:
      return {
        ...state,
        data: {
          ...state.data,
          ...getAllLayersIsinsObject(state.layers.layersById)
        }
      };

    default:
      return {
        ...state,
        layers: layers(state.layers, action),
        movers: movers(state.movers, action)
      }
  }
};

export default market;
