import { actionTypes } from './actionTypes'
import * as Auth from '../data/providers/Auth'
import { localStorageProvider } from '../data/helpers';
import { ACCESS_TOKEN } from '../data/constants'

export const login = ({ email, password }) => async (dispatch) => {

  dispatch({ type: actionTypes.LOGIN_REQUEST });

  try {
    const data = await Auth.login(email, password);
    dispatch({type: actionTypes.LOGIN_SUCCESS, data})
  }
  catch(error) {
    dispatch({ type: actionTypes.LOGIN_FAILURE, data: error })
  }
};

export const loginWithToken = () => async (dispatch) => {
  const token = localStorageProvider.load(ACCESS_TOKEN);

  if (typeof token === 'undefined') return;

  dispatch({ type: actionTypes.LOGIN_REQUEST });

  try {
    const data = await Auth.loginWithToken();
    dispatch({ type: actionTypes.LOGIN_SUCCESS, data })
  }
  catch (resp) {
    dispatch({ type: actionTypes.LOGIN_FAILURE, data: resp })
  }
};

export const logout = () => async (dispatch) => {

  dispatch({ type: actionTypes.LOGOUT_REQUEST });
  try {
    await Auth.logout();
    dispatch({ type: actionTypes.LOGOUT_SUCCESS })
  }
  catch (error){
    dispatch({ type: actionTypes.LOGOUT_FAILURE, data: error })
  }
};
