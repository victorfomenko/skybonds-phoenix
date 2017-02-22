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
	        filters: [],
	        include: [],
	        exclude: []
	      },
	      ui: {
			name : 'Empty set',
			viewMode : 'bonds'
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
		search: {
			bonds: [],
			placeholderBonds: []
		},
		filters: {
			isins: [],
			stats: []
		},
		isins: []
	}
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
			 movers: movers(state.movers, action) 
			}
	};
};

export default market;
