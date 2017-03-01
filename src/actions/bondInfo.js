import { actionTypes } from './actionTypes';
import * as DataProvider from '../data/providers/Data';

export const openBondInfo = (isin, date) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.OPEN_BOND_INFO,
      isin: isin,
      date: date
    });
  }
  catch (response) {
    dispatch({
      type: actionTypes.OPEN_BOND_INFO,
      response
    });
  }
};

export const getBondInfo = (isin, date) => async (dispatch, getState) => {
  try {

    let info = await DataProvider.getBondsInfo([isin]);
    let daily = await DataProvider.getBondsDaily([isin], date);
    let putDates = await DataProvider.getBondsSchedulePut(isin);

    dispatch({
      type: actionTypes.GET_BOND_INFO,
      isin: isin,
      date: date,
      info: info[0].data,
      daily: daily[0].data,
      putDates: putDates.data
    });
  }
  catch (response) {
    dispatch({
      type: actionTypes.GET_BOND_INFO,
      response
    });
  }
};

export const closeBondInfo = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.CLOSE_BOND_INFO });
};
