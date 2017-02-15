import { actionTypes } from '../../../actions/actionTypes'
import { omit, mapValues, assign } from 'lodash';


const filters = {
  industry:{
    values: [
      {name: 'Agency'},
      {name: 'Mining/Diversified'},
      {name: 'Banks'},
      {name: 'Mortgage'},
      {name: 'Ferrous metals'},
      {name: 'Light industry'},
      {name: 'Other'},
      {name: 'Supranational'},
      {name: 'Communication'},
      {name: 'Finance'},
      {name: 'Non-ferrous metals'},
      {name: 'Electric Power'},
      {name: 'Information and High Technologies'},
      {name: 'Transportation'},
      {name: 'Health Care Centers'},
      {name: 'Trade and retail'},
      {name: 'Timber and paper&pulp industry'},
      {name: 'Sovereign'},
      {name: 'Agricultural'},
      {name: 'Oil and Gas'},
      {name: 'Chemicals'},
      {name: 'Power'},
      {name: 'Construction and development'},
      {name: 'Food'},
      {name: 'Auto/Truck mfrs'},
      {name: 'Municipal'},
      {name: 'Media and Entertainment'}
    ]
  },
  currency: {
    values: [
      {name:'ITL'},
      {name:'NZD'},
      {name:'HUF'},
      {name:'ILS', selected: false, tag: '123'},
      {name:'CLP'},
      {name:'ZAR'},
      {name:'CRC'},
      {name:'JMD'},
      {name:'TRY', disabled: true},
      {name:'KZT', tag: '1123235'},
      {name:'DOP', tag: '1235', selected: false},
      {name:'COP'},
      {name:'CAD'},
      {name:'KRW'},
      {name:'GBP'},
      {name:'DKK'},{name:'PLN'},{name:'CNY'},{name:'DEM'},{name:'RON'},{name:'CHF'},{name:'SAR'},{name:'JPY'},{name:'IDR'},{name:'SEK'},{name:'USD'},{name:'MXN'},{name:'ZMW'},{name:'SGD'},{name:'CZK'},{name:'NOK'},{name:'PEN'},{name:'NGN'},{name:'UAH'},{name:'NAD'},{name:'GEL'},{name:'GHS'},{name:'INR'},{name:'AUD'},{name:'EUR'},{name:'BRL'},{name:'HKD'},{name:'MYR'},{name:'RUB'}],
    sortStrategy: function (a, b) {
      let map = {};
      let order = [
        'RUB',
        'USD',
        'EUR'
      ];

      order.forEach((value, index) => {
        map[value] = order.length - index
      });

      order = map;

      const nameA = String(a.name).toUpperCase();
      const nameB = String(b.name).toUpperCase();
      const aWeight = order[nameA] ? order[nameA] : 0;
      const bWeight = order[nameB] ? order[nameB] : 0;
      if (aWeight > bWeight){return -1}
      if (aWeight < bWeight){return 1}
      if (nameA < nameB){return -1}
      if (nameA > nameB){return 1}
      return 0
    }
  },
  rating: {
    values: [
      { name: 'AAA', color: '#72ceff' },
      { name: 'AA+', color: '#ef7c00' },
      { name: 'AA', color: '#ef7c00' },
      { name: 'AA-', color: '#ef7c00' },
      { name: 'A+', color: '#a800cc' },
      { name: 'A', color: '#a800cc' },
      { name: 'A-', color: '#a800cc' },
      { name: 'BBB+', color: '#00963f' },
      { name: 'BBB', color: '#00963f' },
      { name: 'BBB-', color: '#00963f' },
      { name: 'BB+', color: '#47599d' },
      { name: 'BB', color: '#47599d' },
      { name: 'BB-', color: '#47599d' },
      { name: 'B+', color: '#ff6e7e' },
      { name: 'B', color: '#ff6e7e' },
      { name: 'B-', color: '#ff6e7e' },
      { name: 'CCC+', color: '#ffd400' },
      { name: 'CCC', color: '#ffd400' },
      { name: 'CCC-', color: '#ffd400' },
      { name: 'CC', color: '#af6725' },
      { name: 'C', color: '#b04127' },
      { name: 'D', color: '#808080' },
      { name: 'NR', color: '#cbcbcb' }
    ],
    sortStrategy: function (a, b) {
      let ratings = {
        'AAA': {color: '#72ceff', group: 'AAA', synonym: 'Aaa', order: 100},
        'AA+': {color: '#ef7c00', group: 'AA', synonym: 'Aa1', order: 96},
        'AA': {color: '#ef7c00', group: 'AA', synonym: 'Aa2', order: 95},
        'AA-': {color: '#ef7c00', group: 'AA', synonym: 'Aa3', order: 94},
        'A+': {color: '#a800cc', group: 'A', synonym: 'A1', order: 91},
        'A': {color: '#a800cc', group: 'A', synonym: 'A2', order: 90},
        'A-': {color: '#a800cc', group: 'A', synonym: 'A3', order: 89},
        'BBB+': {color: '#00963f', group: 'BBB', synonym: 'Baa1', order: 86},
        'BBB': {color: '#00963f', group: 'BBB', synonym: 'Baa2', order: 85},
        'BBB-': {color: '#00963f', group: 'BBB', synonym: 'Baa3', order: 84},
        'BB+': {color: '#47599d', group: 'BB', synonym: 'Ba1', order: 81},
        'BB': {color: '#47599d', group: 'BB', synonym: 'Ba2', order: 80},
        'BB-': {color: '#47599d', group: 'BB', synonym: 'Ba3', order: 79},
        'B+': {color: '#ff6e7e', group: 'B', synonym: 'B1', order: 76},
        'B': {color: '#ff6e7e', group: 'B', synonym: 'B2', order: 75},
        'B-': {color: '#ff6e7e', group: 'B', synonym: 'B3', order: 74},
        'CCC+': {color: '#ffd400', group: 'CCC', synonym: 'Caa1', order: 71},
        'CCC': {color: '#ffd400', group: 'CCC', synonym: 'Caa2', order: 70},
        'CCC-': {color: '#ffd400', group: 'CCC', synonym: 'Caa3', order: 69},
        'CC': {color: '#af6725', group: 'CC', synonym: 'Ca', order: 65},
        'C': {color: '#b04127', group: 'C', synonym: 'C', order: 60},
        'D': {color: '#808080', group: 'D', synonym: 'D', order: 57},
        'NR': {color: '#cbcbcb', group: 'NR', synonym: 'NR', order: 55}
      };

      let getOrder = (rating)=> {
        return ratings[rating].order
      };

      let result = getOrder(a.name);
      if (result == null) {result = 0}
      let result1 = getOrder(b.name);
      if (result1 == null) {result1 = 0}
      return result1 - result;
    }
  },
  outlook: {
    values: [
      {
        name: 'na'
      },
      {
        name: 'negative'
      },
      {
        name: 'stable',
        selected: false
      },
      {
        name: 'positive',
        disabled: false
      },
    ]
  },
  country: {
    values: [
      {
        name: 'USA',
        selected: false
      },
      {
        name: 'RUS'
      },
      {
        name: 'GBR',
        selected: false
      }
    ]
  },

  domInt: {
    values: [
      {
        name: 'domestic',
        tag: '1'
      },
      {
        name: 'international'
      }
    ]
  },
  corporations: {
    values: [
      {
        name: 'corporations'
      },
      {
        name: 'non-corporations'
      }
    ]
  },
  financial: {
    values: [
      {
        name: 'financial'
      },
      {
        name: 'non-financial'
      }
    ]
  },
  government: {
    values: [
      {
        name: 'true'
      },
      {
        name: 'false'
      }
    ]
  },
  liquidity: {
    values: [
      {name: 'non-liquid'},
      {name: 'low'},
      {name: 'average'},
      {name: 'high'},
      {name: 'very high'}
    ]
  },
  type: {
    values: [
      {name: 'regular'},
      {name: 'subord'},
      {name: 'floater'},
      {name: 'convertible'}
    ]
  }
};

const initialState = {
  layers: [1],
  layersById: {
    1: {
      id : 1,
      name : 'Empty set',
      search: {
        query: ''
      },
      filters : filters,
      'viewMode' : 'bonds'
    }
  },
  activeLayer: 1,
};

const layers = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.ADD_LAYER:
      let newId = state.layers[state.layers.length-1] + 1;
      return {
        layers: state.layers.concat(newId),
        layersById: {
          ...state.layersById,
          [newId]: {
            id: newId,
            name: 'Empty set',
            search: {},
            filters: filters,
            'viewMode' : 'bonds',
          }
        },
        activeLayer: newId,
      };

    case actionTypes.DELETE_LAYER:
      if(state.layers.length == 1) {
        return initialState;
      }
      return {
        ...state,
        layers: state.layers.filter(id => id !== action.id),
        layersById: omit(state.layersById, action.id),
        activeLayer: (action.id == state.activeLayer) ? state.layers[0] : state.activeLayer,
      };

    case actionTypes.RENAME_LAYER:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === action.id ?
            assign({}, layer, { name: action.name }) :
            layer
        })
      }

    case actionTypes.CHANGE_LAYER_VIEW:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === action.id ?
            assign({}, layer, { viewMode: action.viewMode }) :
            layer
        })
      };

    case actionTypes.ACTIVATE_LAYER:
      return {
        ...state,
        activeLayer: action.id,
      };

    case actionTypes.CHANGE_FILTER:
      return {
        ...state,
        layersById: mapValues(state.layersById, (layer) => {
          return layer.id === state.activeLayer ?
            assign({}, layer, { filters: action.filters }) :
            layer
        })
      };

    case actionTypes.SEARCH_BOND:
      return state;


    default:
      return state
  }
};

export default layers
