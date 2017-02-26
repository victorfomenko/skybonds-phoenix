import { actionTypes } from '../../../actions/actionTypes';
import { omit, mapValues, assign, cloneDeep, intersection, uniq } from 'lodash';
import { getAutoName } from '../../../helpers/LayerAutoName';
import { LAYER_SET_VIEW_MODES } from '../../../data/constants';
import { emptytLayer } from '../../../data/helpers/defaultStructures';

const REPORT_ISINS_QUOTA = 200;


const getLayerIsinsAll = (searchIsins, filtersIsins)=> {
  let result = [];
  if (searchIsins.length && filtersIsins.length) {
    result = intersection(searchIsins, filtersIsins);
  } else if (searchIsins.length) {
    result = searchIsins;
  } else if(filtersIsins.length) {
    result = filtersIsins;
  }
  return result;
};

const getLayerIsinsByQuota = (layersById, callback)=> {
  let result = {};
  let idsNonEmptyLayers = [];

  mapValues(layersById, (layer, id) => {
    if(layer.data.isinsAll.length) {
      idsNonEmptyLayers.push(id);
    }
    result[id] = [];
  });

  idsNonEmptyLayers = idsNonEmptyLayers.sort((idA,idB)=>{
    let a = layersById[idA].data.isinsAll;
    let b = layersById[idB].data.isinsAll;
    return a.length - b.length;
  });

  let maxIsinsPerLayer = Math.floor(REPORT_ISINS_QUOTA / idsNonEmptyLayers.length);
  let remainingQuota = REPORT_ISINS_QUOTA;
  idsNonEmptyLayers.forEach((layerId, index)=>{
    let isins = layersById[layerId].data.isinsAll;
    let isinsByQuota = isins.slice(0, maxIsinsPerLayer);
    result[layerId] = isinsByQuota;
    remainingQuota -= isinsByQuota.length;
    if(index < idsNonEmptyLayers.length - 1) {
      maxIsinsPerLayer = Math.floor(remainingQuota / (idsNonEmptyLayers.length - index - 1));
    }
  });
  return callback(result);
};

const layers = (state = {}, action) => {
  switch (action.type) {

    case actionTypes.ADD_SET:
      let newId = String(Number(state.ids[state.ids.length-1]) + 1);
      return {
        ids: state.ids.concat(newId),
        layersById: {
          ...state.layersById,
          [newId]: {
            ...emptytLayer
          }
        }
      };

    case actionTypes.REMOVE_LAYER:
      if(state.ids.length === 1) {
        return {
          ids: ['1'],
          layersById: {
            ['1']: {
              ...emptytLayer,
            }
          }
        };
      }
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.id),
        layersById: omit(state.layersById, action.id)
      };

    case actionTypes.RENAME_LAYER:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer, id) => {
          return id === action.id ? {
              ...layer,
              ui: {
                ...layer.ui,
                name: action.name
              }
            } : layer;
        })
      };

    case actionTypes.CHANGE_LAYER_VIEW:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer, id) => {
          return id === action.id ? {
              ...layer,
              ui: {
                ...layer.ui,
                viewMode: action.viewMode
              }
            } : layer;
        })
      };

    case actionTypes.LAYER_SEARCH_QUERY_CHANGE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer, id) => {
          return id === action.id ?
            {...layer,
              ui: {
                ...layer.ui,
                autoName: getAutoName({...layer.source.search, query: action.query}, layer.source.filters),
              },
              source: {...layer.source,
                search: {...layer.source.search,
                  query: action.query
                }
              }
            } : layer;
        })
      };

    case actionTypes.LAYER_SEARCH_ISINS_CHANGE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer, id) => {
          return id === action.id ?
            {...layer,
              data: {...layer.data,
                search: {...layer.data.search,
                  isins: action.isins
                },
                isinsAll: getLayerIsinsAll(action.isins, layer.data.filters.isins)
              }
            } : layer
        })
      };

    case actionTypes.LAYER_FILTERS_ISINS_CHANGE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer, id) => {
          return id === action.id ?
            {...layer,
              data: {...layer.data,
                filters: {...layer.data.filters,
                  isins: action.isins,
                  stats: action.stats
                },
                isinsAll: getLayerIsinsAll(layer.data.search.isins, action.isins)
              }
            } : layer
        })
      };

    case actionTypes.LAYER_FILTERS_STATS_CHANGE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer, id) => {
          return id === action.id ?
            {...layer,
              data: {...layer.data,
                filters: {...layer.data.filters,
                  stats: action.stats
                }
              }
            } : layer;
        })
      };

    case actionTypes.LAYER_FILTERS_CHANGE:
      if(!action.id) { return state; }
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer, id) => {
          return id === action.id ?
            {...layer,
              ui: {...layer.ui,
                autoName: getAutoName(layer.source.search, {...layer.source.filters, filters: action.filters })
              },
              source: {...layer.source,
                filters: action.filters
              }
            } : layer;
        })
      };

    case actionTypes.LAYER_ISINS_BY_QUOTA_UPDATE:
      return {
        ...state,
        layersById: getLayerIsinsByQuota(state.layersById, (layerIsinsByQuota)=>{
          return mapValues(state.layersById, (layer, id) => {
            return {
              ...layer,
              data: {...layer.data,
                isinsByQuota: layerIsinsByQuota[id]
              }
            }
          })
        })
      };

    case actionTypes.LAYER_BONDS_UPDATE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer, id) => {
          return id === action.id ?
            {...layer,
              data: {...layer.data,
                bonds: action.bonds
              }
            } : layer;
        })
      };

    default:
      return state;
  }
};

export default layers;
