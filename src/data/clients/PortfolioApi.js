import { requestProvider } from '../helpers';
import request from 'browser-request';
import DateDayCaster from '../casters/DateDayCaster';

const PROTO_API = 'http://proto.skybonds.net/api/portfolio';
const PORTFOLIO_ID = 'scb';

export const getQuantityByDate = (date) => {
	return new Promise((resolve, reject)=>{
		request({
			method: 'GET',
			url: `${PROTO_API}/${PORTFOLIO_ID}/bonds/${DateDayCaster.format(date)}`,
			json: true
		}, (error, response, body) => {
			if(error) { reject(error) }
			if(response.status == 200) {
				resolve(body)
			}
			reject(body)
		})
	});
  // TODO У Сухроба portfolioApi работало через fetch. Тогда как у меня — нет.
  // Версия браузера полностью совпадала. Chrome 56.0.2924.87 (64-bit)
  // Разобраться в почему fetch не отрабатывал у меня и заменить browser-request на fetch.
  // return requestProvider.get({
  // 	url: `${PROTO_API}/${PORTFOLIO_ID}/bonds/${date}`
  // });
};

export const getDailyData = (isins, date, attrs = []) => {
  return requestProvider.post({
    url: `${PROTO_API}/${PORTFOLIO_ID}/daily/${DateDayCaster.format(date)}`,
    body: isins,
    qs: { attrs }
  });
};

