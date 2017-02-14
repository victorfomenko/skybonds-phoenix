import { actionTypes as types } from '../constants'

const user = (state = {}, action) => {
	switch (action.type) {
		case types.SIGNUP_SUCCESS:
		case types.LOGIN_SUCCESS:
			if(!action.data.id) return {}
			return action.data
    	case types.LOGIN_FAILURE:
  			return action.data
    	case types.LOGOUT_SUCCESS:
  			return {}
		default:
			return state
  }
}

export default user
