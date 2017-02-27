import { actionTypes } from '../actions/actionTypes';

const initalState = {
  parentBond: {},
  selectedPeersIsins: [],
  showBenchmark: true,
  peersBonds: [],
}
const bond = (state = initalState, action) => {
	switch (action.type) {
    case actionTypes.GET_BOND_DATA:
      return {
        ...state,
        parentBond: action.bond
      }

    case actionTypes.GET_PEERS_DATA:
      return {
        ...state,
        peersBonds: action.peersBonds
      }

    case actionTypes.ADD_PEER_TO_CHART:
      return {
        ...state,
        selectedPeersIsins: state.selectedPeersIsins.concat(action.isin)
      }

    case actionTypes.REMOVE_PEER_FROM_CHART:
      return {
        ...state,
        selectedPeersIsins: state.selectedPeersIsins.filter(isin => isin !== action.isin)
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
