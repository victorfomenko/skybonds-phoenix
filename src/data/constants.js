export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const USER_DATA = 'USER_DATA';

export const MARKET_REPORT_VIEW_MODES = {
  SCATTERPLOT: 'scatterplot',
  TIMESERIES: 'timeseries',
  TABLE: 'table'
};

export const LAYER_SET_VIEW_MODES = {
  BONDS: 'bonds',
  CURVES: 'curves',
  BONDS_AND_CURVES: 'bonds_and_curves',
  HIDDEN: 'hidden'
};


export const DEFAULT_LAYER = {
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
