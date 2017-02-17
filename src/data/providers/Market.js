import * as MarketApi from '../clients/MarketApi';

export const getMarket = (isin) => {
  return MarketApi.getMarket(isin);
};
