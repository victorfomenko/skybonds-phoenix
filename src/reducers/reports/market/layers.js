import { actionTypes } from '../../../actions/actionTypes';
import { omit, mapValues, assign, cloneDeep, intersection } from 'lodash';

const defaultLayer = {
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
    name: 'Empty set',
    viewMode : 'bonds'
  },
  data: {
    search: {
      isins: []
    },
    filters: {
      isins: [],
      stats: []
    },
    isins: [],
    bonds: []
  }
}

const layers = (state = {}, action) => {
  switch (action.type) {

    case actionTypes.ADD_LAYER:
      let newId = String(Number(state.ids[state.ids.length-1]) + 1);
      return {
        ids: state.ids.concat(newId),
        layersById: {
          ...state.layersById,
          [newId]: {
            ...defaultLayer
          }
        }
      };

    case actionTypes.DELETE_LAYER:
      if(state.ids.length === 1) {
        return {
          ids: ['1'],
          layersById: {
            ['1']: {
              ...defaultLayer,
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

    case actionTypes.LAYER_SEARCH_ISINS_CHANGE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          const searchIsins = action.isins;
          const filtersIsins = layer.dataComputed.filters.isins;
          let layerIsins = [];
          if (searchIsins.length && filtersIsins.length) {
            layerIsins = intersection(searchIsins, filtersIsins);
          } else if (searchIsins.length) {
            layerIsins = searchIsins;
          } else if(filtersIsins.length) {
            layerIsins = filtersIsins;
          }
          return layer.id === action.id ?
            {...layer,
              dataSource: {...layer.dataSource,
                search: {...layer.dataSource.search,
                  query: action.query
                },
              },
              dataComputed: {...layer.dataComputed,
                search: {...layer.dataComputed.search,
                  isins: action.isins
                },
                isins: layerIsins
              }
            } : layer;
        })
      };

    case actionTypes.LAYER_FILTERS_ISINS_CHANGE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          const searchIsins = layer.dataComputed.search.isins;
          const filtersIsins = action.isins;
          let layerIsins = [];
          if (searchIsins.length && filtersIsins.length) {
            layerIsins = intersection(searchIsins, filtersIsins);
          } else if (searchIsins.length) {
            layerIsins = searchIsins;
          } else if(filtersIsins.length) {
            layerIsins = filtersIsins;
          }
          return layer.id === action.id ?
            {...layer,
              dataComputed: {...layer.dataComputed,
                filters: {...layer.dataComputed.filters,
                  isins: action.isins,
                  stats: action.stats
                },
                isins: layerIsins
              }
            } : layer;
        })
      };

    case actionTypes.LAYER_FILTERS_STATS_CHANGE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === action.id ?
            {...layer,
              dataComputed: {...layer.dataComputed,
                filters: {...layer.dataComputed.filters,
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
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === action.id ?
            {...layer,
              dataSource: {...layer.dataSource,
                filters: action.filters
              }
            } : layer;
        })
      };

    case actionTypes.LAYER_BONDS_UPDATE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === action.id ?
            {...layer,
              dataComputed: {...layer.dataComputed,
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
