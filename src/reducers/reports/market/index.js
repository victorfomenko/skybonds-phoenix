import { actionTypes } from '../../../actions/actionTypes';

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
			name : 'Empty set',
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
	data: {}
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
			}
			break;

		default: 
			return {
			 ...state,
			 layers: layers(state.layers, action),
			 movers: movers(state.movers, action) 
			}
	};
};

export default market;
