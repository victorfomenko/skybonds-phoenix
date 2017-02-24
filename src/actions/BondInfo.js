import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';

export const openBondInfo = (isin, date) => async (dispatch, getState) => {
  try {
    let dailyAttrs = ['coupon'];
    let infoAttrs = ['isin', 'standardName', 'maturityDate', 'issuerId', 'issuer', 'sector', 'outlook', 'ratingGroup'];

    let info = await DataProvider.getBondsInfo([isin], infoAttrs);
    let daily = await DataProvider.getBondsDaily([isin], date, dailyAttrs);
    let putDates = await DataProvider.getBondsSchedulePut(isin);

    dispatch({
      type: actionTypes.OPEN_BOND_INFO,
      isin: isin,
      date: date,
      info: info[0].data,
      daily: daily[0].data,
      putDates: putDates.data
    });
  }
  catch (response) {
    dispatch({
      type: actionTypes.OPEN_BOND_INFO,
      response
    });
  }
};

export const closeBondInfo = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.CLOSE_BOND_INFO });
};
