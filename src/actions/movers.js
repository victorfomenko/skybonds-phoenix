import { actionTypes as types, urls } from '../constants';
import * as Movers from '../data/providers/Movers'


export const loadMovers = ({isins, startDate, endDate, selectedPeriod, selectedUnit}) => async (dispatch) => {
  dispatch({ type: types.LOAD_MOVERS });
  try {
    const data = await Movers.loadMovers({isins, startDate, endDate, paramName: selectedUnit});
    dispatch({ type: types.LOAD_MOVERS_SUCCESS, data, isins, selectedPeriod, selectedUnit });
  }
  catch (error) {
    dispatch({ type: types.LOAD_MOVERS_FAILURE, data: error });
  }
}

