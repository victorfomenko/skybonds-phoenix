import { actionTypes } from '../../../actions/actionTypes';

const initialState = {
  isin: null,
  info: null,
  daily: null,
  putDates: null,
  show: false,
  loading: false,
  date: null
};

const bondInfo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_BOND_INFO:
      return {
        ...state,
        isin: action.isin,
        date: action.date,
        show: true,
        loading: true
      };

    case actionTypes.GET_BOND_INFO:
      return {
        ...state,
        isin: action.isin,
        info: action.info,
        daily: action.daily,
        putDates: action.putDates,
        date: action.date,
        loading: false
      };

    case actionTypes.CLOSE_BOND_INFO:
      return initialState;

    default:
      return state;
  }
};

export default bondInfo;
