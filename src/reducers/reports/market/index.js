import { actionTypes } from '../../../actions/actionTypes';
import { mapValues, uniq } from 'lodash';
import { LAYER_SET_VIEW_MODES } from '../../../data/constants';
import { getEmptyMarketReport } from '../../../data/helpers/defaultStructures';

import layers from './layers';
import movers from './movers';
import bondInfo from './bondInfo';

const initState = getEmptyMarketReport();

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

    case actionTypes.MARKET_REPORT_UPDATE:

      return {
        ...state,
        ...action.report,
        layers: layers(action.report.layers, action),
        movers: movers(state.movers, action),
        bondInfo: bondInfo(state.bondInfo, action)
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

    case actionTypes.REPORT_UPDATE_SUCCESS:
      return {
        ...state,
        version: action.version
      };

    case actionTypes.REPORT_RENAME:
      if(state.id === action.id) {
        return {
          ...state,
          ui: {
            ...state.ui,
            spaceName: action.name
          },
          version: action.version
        }
      };

    default:
      return {
        ...state,
        layers: layers(state.layers, action),
        movers: movers(state.movers, action),
        bondInfo: bondInfo(state.bondInfo, action)
      }
  }
};

export default market;
