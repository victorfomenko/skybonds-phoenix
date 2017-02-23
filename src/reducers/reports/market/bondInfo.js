import { actionTypes } from '../../../actions/actionTypes';

const initialState = {
  isin: null,
  bond: null,
  show: false
};

const bondInfo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_BOND_INFO:
      console.log('action', action);
      return {
        ...state,
        isin: action.isin,
        bond: action.bond,
        show: true
      };

    case actionTypes.CLOSE_BOND_INFO:
      return {
        ...state,
        isin: null,
        show: false
      };

    default:
      return state;
  }
};

export default bondInfo;
