import { requestProvider } from '../helpers';
import request from 'browser-request';
import DateDayCaster from '../casters/DateDayCaster';

const PROTO_API = 'http://proto.skybonds.net/api/portfolio';
const PORTFOLIO_ID = 'scb';

export const getQuantityByDate = (date) => {
	return new Promise((resolve,reject)=>{
		request({
			method: 'GET',
			url: `${PROTO_API}/${PORTFOLIO_ID}/bonds/${date}`,
			json: true
		}, (error, response, body) => {
			if(error) { reject(error) }
			if(response.status == 200) { 
				const result = body.map(item=> {
					return item.isin;
				})
				resolve(result) 
			}
			reject(error)
		})	
	})
	
	// return requestProvider.get({
	// 	url: `${PROTO_API}/${PORTFOLIO_ID}/bonds/${date}`
	// });
};
