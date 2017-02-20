import { actionTypes } from '../actions/actionTypes';

const initalState = {
    query: '',
    bonds: []
};

const home = (state = initalState, action) => {
	switch (action.type) {
    case actionTypes.HOME_SEARCH_RESPONSE:
      return {
        query: action.query,
        bonds: action.bonds
      };
    case actionTypes.HOME_SEARCH_DAILY:
      return {...state,
        bonds: action.bonds
      };
		default:
			return state;
  }
};

export default home;
