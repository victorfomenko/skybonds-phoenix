import * as RatesApi from '../clients/RatesApi';

export const getByDate = (date) => {
  return RatesApi.getByDate(date);
};
