import { requestProvider } from '../helpers';
import DateDayCaster from '../casters/DateDayCaster';

const PROTO_API = 'http://proto.skybonds.net/api/portfolio';
const PORTFOLIO_ID = 'scb';

export const getQuantityByDate = (date) => {
	//date = DateDayCaster.format(date)
	
	return requestProvider.get({
		url: `${PROTO_API}/${PORTFOLIO_ID}/bonds/${date}`
	});
};
