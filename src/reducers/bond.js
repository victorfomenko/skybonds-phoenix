import { actionTypes } from '../actions/actionTypes';

const initalState = {
  selectedPeers: [],
  showBenchmark: true,
}
const bond = (state = initalState, action) => {
	switch (action.type) {
    case actionTypes.ADD_PEER_TO_CHART:
      return {
        ...state,
        selectedPeers: state.selectedPeers.concat({
          isin: action.isin, name: action.name, color: action.color
        })
      }

    case actionTypes.REMOVE_PEER_FROM_CHART:
      return {
        ...state,
        selectedPeers: state.selectedPeers.filter(bond => bond.isin !== action.isin),
      }

    case actionTypes.TOGGLE_BENCHMARK:
      return {
        ...state,
        showBenchmark: !state.showBenchmark
      }

  	default:
  	  return state;
  }
};

export default bond;
