import { LAYER_SET_VIEW_MODES } from '../constants';
import { isPortfolioScb } from '../../helpers/portfolio';
import { localStorageProvider } from '../helpers';
import { USER_DATA } from '../constants';

export const getEmptyLayer = ()=> {
  return {
    source: {
      method: 'set',
      search: {
        query: '',
        peersFor: []
      },
      filters: {},
      include: [],
      exclude: []
    },
    ui: {
      name: '',
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
};

export const getEmptyFilters = () => {
    let filters = {
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
          {name:'ILS'},
          {name:'CLP'},
          {name:'ZAR'},
          {name:'CRC'},
          {name:'JMD'},
          {name:'TRY'},
          {name:'KZT'},
          {name:'DOP'},
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
            map[value] = order.length - index;
          });

          order = map;

          const nameA = String(a.name).toUpperCase();
          const nameB = String(b.name).toUpperCase();
          const aWeight = order[nameA] ? order[nameA] : 0;
          const bWeight = order[nameB] ? order[nameB] : 0;
          if (aWeight > bWeight){return -1;}
          if (aWeight < bWeight){return 1;}
          if (nameA < nameB){return -1;}
          if (nameA > nameB){return 1;}
          return 0;
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
            'NR': {color: '#cbcbcb', group: 'NR', synonym: 'NR', order: 55}
          };

          let getOrder = (rating)=> {
            return ratings[rating].order;
          };

          let result = getOrder(a.name);
          if (result == null) {result = 0;}
          let result1 = getOrder(b.name);
          if (result1 == null) {result1 = 0;}
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
            name: 'stable'
          },
          {
            name: 'positive'
          },
        ]
      },
      country: {
        values: [
          {
            name: 'USA'
          },
          {
            name: 'RUS'
          },
          {
            name: 'GBR'
          }
        ]
      },

      domInt: {
        values: [
          {
            name: 'domestic'
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
      range: {
        values: [
            {name: 'price', values:[], defaultValues:[]},
            {name: 'spread', values:[], defaultValues:[]},
            {name: 'yield', values:[], defaultValues:[]},
            {name: 'duration', values:[], defaultValues:[]},
            {name: 'maturity', values:[], defaultValues:[]},
            {name: 'discount', values:[], defaultValues:[]}
          ],
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
    let user = localStorageProvider.load(USER_DATA);
    if(isPortfolioScb(user)) {
      filters['portfolio'] = {
        values: [{name: 'Portfolio'}]
      }
    }
    return filters
}

export const getEmptyMarketReport = () => {
  return {
    id: null,
    version: '',
    layers: {
      ids: ['1'],
      layersById: {
        '1': getEmptyLayer()
      }
    },
    ui: {
      type: 'market',
      spaceName: 'New report',
      viewMode: 'scatterPlot',
      extensions: {
        calendar: {}
      }
    },
    exclude: [],
    include: [],
    activeLayerId: '1',
    data: {
      allLayersIsinsAll: [],
      allLayersIsinsByQuota: [],
      allLayersIsinsByQuotaVisible: []
    }
  }
}

export const getEmptyReports = () => {
  return {
    ids: [],
    reportsById: {},
    orderVersion: ''
  }
}
