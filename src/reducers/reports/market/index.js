import { actionTypes } from '../../../actions/actionTypes';

import layers from './layers';
import movers from './movers';

const market = (state = {}, action) => {
	state = {
		...state,
		movers: movers(state.movers, action)
	};

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
				source: layers(report.source, action),
				data: {}
			}
			break;
	};

	return state;
};

export default market;
