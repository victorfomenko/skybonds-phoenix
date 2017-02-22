import { actionTypes } from '../../../actions/actionTypes';

const initialState = {
  selectedPeriod: '7D',
  selectedUnit: 'price',
  bonds: {}
};

const movers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_MOVERS_SUCCESS:
      console.log('action', action);
      return {
        ...state,
        selectedPeriod: action.selectedPeriod,
        selectedUnit: action.selectedUnit,
        bonds: action.data
      };

    case actionTypes.LOAD_MOVERS_FAILURE:
  		return state;
    default:
			return state;
  }
};

export default movers;
