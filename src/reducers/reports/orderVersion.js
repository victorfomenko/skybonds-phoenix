import { actionTypes } from '../../actions/actionTypes';


const orderVersion = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.REPORTS_UPDATE_ORDER_VERSION:
      return action.orderVersion
    default:
      return state;
  }
};

export default orderVersion;
