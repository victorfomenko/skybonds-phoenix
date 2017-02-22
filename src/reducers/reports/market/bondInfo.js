import { actionTypes } from '../../../actions/actionTypes';

const initialState = {
  isin: null,
  show: false
};

const bondInfo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_BOND_INFO:
      return {
        ...state,
        isin: action.isin,
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
