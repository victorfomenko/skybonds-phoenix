import { actionTypes } from './actionTypes';
import * as Data from '../data/providers/Data';


export const getBondData = (isin, date) => async (dispatch) => {
  const bond = await Data.getBondsData(isin, date);
  dispatch({ type: actionTypes.GET_BOND_DATA, bond: bond[0]});
}

export const getPeersData = (isins, date) => async (dispatch) => {
  const peersBonds = await Data.getPeersData(isins, date);
  dispatch({ type: actionTypes.GET_PEERS_DATA, peersBonds});
}

export const togglePeer = (isin) => (dispatch, getState) => {
  dispatch({ type: actionTypes.TOGGLE_PEER, isin});
  const selectedPeersIsins = getState().bond.selectedPeersIsins;

  if (selectedPeersIsins.indexOf(isin) !== -1) {
    dispatch({ type: actionTypes.REMOVE_PEER_FROM_CHART , isin: isin});
  } else {
    dispatch({ type: actionTypes.ADD_PEER_TO_CHART , isin});
  }
}

export const addPeerToChart = (isin) => (dispatch) => {
  dispatch({ type: actionTypes.ADD_PEER_TO_CHART , isin});
};

export const removePeerFromChart = (isin) => (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_PEER_FROM_CHART , isin});
};

export const toggleBenchmark = () => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_BENCHMARK});
};
