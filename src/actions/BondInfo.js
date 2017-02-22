import { actionTypes } from './actionTypes';

export const openBondInfo = (isin) => (dispatch, getState) => {
  dispatch({ type: actionTypes.OPEN_BOND_INFO, isin});
};

export const closeBondInfo = (isin) => (dispatch, getState) => {
  dispatch({ type: actionTypes.CLOSE_BOND_INFO, isin});
};
