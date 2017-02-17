import { requestProvider } from '../helpers';

const API_V1 = '/api/v1/market/';

export const getMarket = (isin) => {
  return requestProvider.get({
    url: API_V1 + isin + '/quotes'
  });
};
