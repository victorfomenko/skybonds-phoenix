import { actionTypes } from '../actions/actionTypes';
const initalState = {
    query: '',
    results: []
}
const home = (state = initalState, action) => {
	switch (action.type) {
    case actionTypes.HOME_SEARCH_RESPONSE:
      return {
        query: action.query,
        results: action.data
      };
		default:
			return state;
  }
};

export default home;
