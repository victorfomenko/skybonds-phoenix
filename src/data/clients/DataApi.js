import { requestProvider } from '../helpers';
import DateDayCaster from '../casters/DateDayCaster';

const API_V1 = '/api/v1/data/';
const API_V2 = '/api/v2/data/';

export const filtersApply = (filters={}, stats=false, details=false) => {
  return requestProvider.post({
    url: API_V2 + 'filters/apply',
    body: filters,
    qs: {
      stats,
      details
    }
  });
}

export const getBondsInfo = (isins) => {
  return requestProvider.post({
    url: API_V1 + 'bonds/info',
    body: isins
  })
}

export const getBondsDaily = (isins, date, attrs = []) => {
  return requestProvider.post({
    url: API_V1 + 'bonds/daily/' + DateDayCaster.format(date),
    body: isins,
    qs: { attrs }
  })
}


// TODO: handle errors on base _request layer
