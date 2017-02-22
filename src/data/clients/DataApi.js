import { requestProvider } from '../helpers';
import DateDayCaster from '../casters/DateDayCaster';

const API_V1 = '/api/v1/data/';
const API_V2 = '/api/v2/data/';

export const filtersApply = (filters={}, stats=false, details=false) => {
  if(filters.date != null){
    filters = {
      ...filters,
      date: DateDayCaster.format(filters.date)
    }
  }
  return requestProvider.post({
    url: API_V2 + 'filters/apply',
    body: filters,
    qs: {
      stats,
      details
    }
  });
};

export const filtersStats = (filters, isins) => {
  if(filters.date != null){
    filters = {
      ...filters,
      date: DateDayCaster.format(filters.date),
      isins
    }
  }
  return requestProvider.post({
    url: API_V2 + 'filters/stats',
    body: filters,
  });
};

export const getBondsInfo = (isins, attrs = []) => {
  return requestProvider.post({
    url: API_V1 + 'bonds/info',
    body: isins,
    qs: { attrs }
  });
};

export const getBondsDaily = (isins, date, attrs = []) => {
  return requestProvider.post({
    url: API_V1 + 'bonds/daily/' + DateDayCaster.format(date),
    body: isins,
    qs: { attrs }
  });
};

export const getIssuersInfo = (issuerIds, attrs = []) => {
  return requestProvider.post({
    url: API_V1 + 'issuers/info',
    body: issuerIds,
    qs: { attrs }
  });
};

export const getMovers = (isins, startDate, endDate, paramName) => {
  return requestProvider.post({
    url: API_V1 + 'movers/' + paramName + '?endDate=' + DateDayCaster.format(endDate) + '&startDate=' + DateDayCaster.format(startDate),
    body: isins
  });
};

export const getBondsSchedule = (isin) => {
  return requestProvider.get({
    url: API_V1 + 'bonds/schedule/' + isin
  });
};

export const getBondsSchedulePut = (isin) => {
  return requestProvider.get({
    url: API_V1 + 'bonds/schedule/' + isin + '/put'
  });
};

export const getBondsScheduleCall = (isin) => {
  return requestProvider.get({
    url: API_V1 + 'bonds/schedule/' + isin + '/call'
  });
};

export const getRatesByDate = (date) => {
  return requestProvider.get({
    url: API_V1 + 'rates/date/' + date
  });
};

export const getTimeSeries = (isin, dates) => {
  return requestProvider.post({
    url: API_V1 + 'bonds/timeseries/' + isin,
    body: dates
  });
};

// TODO: handle errors on base _request layer
