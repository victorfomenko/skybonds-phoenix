import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';

export const openBondInfo = (isin, date) => async (dispatch, getState) => {
  try {
    let dailyAttrs = ['coupon'];
    let infoAttrs = ['isin', 'standardName', 'maturityDate', 'issuerId', 'issuer', 'sector', 'outlook', 'ratingGroup'];

    let info = await DataProvider.getBondsInfo([isin], infoAttrs);
    console.log('DataProvider.getBondsInfo([isin], infoAttrs);', DataProvider.getBondsInfo([isin], infoAttrs));
    //let daily = await DataProvider.getBondsDaily([isin], date, dailyAttrs);
    //let putDates = await DataProvider.getBondsSchedulePut(isin);

    dispatch({
      type: actionTypes.OPEN_BOND_INFO,
      bond: {
        'isin': isin,
        'info': info.data
        //'daily': daily.data,
        //'putDates': putDates.data
      }
    });

    //Promise.all([
    //  DataProvider.getBondsInfo([isin], infoAttrs),
    //  DataProvider.getBondsDaily([isin], date, dailyAttrs),
    //  DataProvider.getBondsSchedulePut(isin)
    //]).then((response) => {
    //  dispatch({
    //    type: actionTypes.OPEN_BOND_INFO,
    //    bond: {
    //      'isin': isin,
    //      'info': response[0][0].data,
    //      'daily': response[1][0].data,
    //      'putDates': response[2].data
    //    }
    //  });
    //})
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
