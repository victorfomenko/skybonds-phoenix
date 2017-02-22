import { actionTypes } from '../../../actions/actionTypes';
import { omit, mapValues, assign, cloneDeep } from 'lodash';


const source = (state = {}, action) => {
  switch (action.type) {

    case actionTypes.ADD_LAYER:
      let newId = state.layers[state.layers.length-1] + 1;
      return {
        layers: state.layers.concat(newId),
        layersById: {
          ...state.layersById,
          [newId]: {
            id: newId,
            search: {
                query: '',
                peersFor: []
              },
            filters: [],
            include: [],
            exclude: [],
          }
        },
        include: [],
        exclude: []
      };

    case actionTypes.DELETE_LAYER:
      // if(state.layers.length == 1) {
      //   return initialState;
      // }
      return {
        ...state,
        layers: state.layers.filter(id => id !== action.id),
        layersById: omit(state.layersById, action.id),
      };

    case actionTypes.LAYER_SEARCH_REQUEST:
      // should change state.query, but before debounce, not after
      return state;
    // return {
    //   ...state,
    //   layersById: mapValues(state.layersById, (layer) => {
    //     return layer.id === action.id ?
    //       {...layer, search: {...layer.search, query: action.query}} :
    //       layer
    //   })
    // };

    case actionTypes.LAYER_SEARCH_RESPONSE:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === action.id ?
            {...layer,
              dataSource: {...layer.dataSource,
                search: {...layer.dataSource.search,
                  query: action.query
                },
              },
              dataComputed: {...layer.dataComputed,
                search: {...layer.dataComputed.search,
                  bonds: action.bonds
                },
              }
            } : layer;
        })
      };

    case actionTypes.LAYER_SEARCH_DAILY:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === action.id ?
            {...layer,
              dataComputed: {...layer.dataComputed,
                search: {...layer.dataComputed.search,
                  bonds: action.bonds
                },
              }
            } : layer;
        })
      };

    case actionTypes.FILTERS_CHANGE:
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

    case actionTypes.FILTERS_ISINS_CHANGE:
      if(!action.id) { return state; }

      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === action.id ?
            {...layer,
              dataComputed: {...layer.dataComputed,
                filters: {...layer.dataComputed.filters,
                  isins: action.isins
                },
              }
            } : layer;
        })
      };

    default:
      return state;
  }
};

export default source;
