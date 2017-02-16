import { actionTypes as types } from '../../../constants'
import NumberCaster from '../../../data/casters/NumberCaster';

const initialState = {
  selectedPeriod: '7D',
  selectedUnit: 'price',
  bonds: {}
}

const movers = (state = initialState, action) => {
	switch (action.type) {
		case types.LOAD_MOVERS_SUCCESS:
      return {
        ...state,
        selectedPeriod: action.selectedPeriod,
        selectedUnit: action.selectedUnit,
        bonds: action.data
      }

    case types.LOAD_MOVERS_FAILURE:
  		return state
    default:
			return state
  }
}

export default movers
