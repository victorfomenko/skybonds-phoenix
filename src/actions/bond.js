import { actionTypes } from './actionTypes';

export const addPeerToChart = (isin, name, color) => (dispatch) => {
  dispatch({ type: actionTypes.ADD_PEER_TO_CHART , isin, name, color});
};

export const removePeerFromChart = (isin) => (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_PEER_FROM_CHART , isin});
};

export const toggleBenchmark = () => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_BENCHMARK});
};
