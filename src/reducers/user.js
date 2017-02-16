import { actionTypes } from '../actions/actionTypes';

const user = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.SIGNUP_SUCCESS:
		case actionTypes.LOGIN_SUCCESS:
			if(!action.data.id) return {};
			return action.data;
    	case actionTypes.LOGIN_FAILURE:
  			return action.data;
    	case actionTypes.LOGOUT_SUCCESS:
  			return {};
		default:
			return state;
  }
};

export default user;
