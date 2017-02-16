import { actionTypes } from './actionTypes';
import * as Movers from '../data/providers/Movers'


export const loadMovers = ({isins, startDate, endDate, selectedPeriod, selectedUnit}) => async (dispatch) => {
  dispatch({ type: actionTypes.LOAD_MOVERS });
  try {
    const data = await Movers.loadMovers({isins, startDate, endDate, paramName: selectedUnit});
    dispatch({ type: actionTypes.LOAD_MOVERS_SUCCESS, data, isins, selectedPeriod, selectedUnit });
  }
  catch (error) {
    dispatch({ type: actionTypes.LOAD_MOVERS_FAILURE, data: error });
  }
}

