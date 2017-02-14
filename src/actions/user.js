import { actionTypes as types, urls } from '../constants'
import * as Auth from '../data/providers/Auth'
import { localStorageProvider } from '../data/helpers';
import { ACCESS_TOKEN } from '../data/constants'

export const login = ({ email, password }) => async (dispatch) => {

  dispatch({ type: types.LOGIN_REQUEST })

  try {
    const data = await Auth.login(email, password)
    dispatch({type: types.LOGIN_SUCCESS, data})
  }
  catch(error) {
    dispatch({ type: types.LOGIN_FAILURE, data: error })
  }
}

export const loginWithToken = () => async (dispatch) => {
  const token = localStorageProvider.load(ACCESS_TOKEN)
  console.log(token)
  if (typeof token === 'undefined') return

  dispatch({ type: types.LOGIN_REQUEST })

  try {
    const data = await Auth.loginWithToken()
    dispatch({ type: types.LOGIN_SUCCESS, data })
  }
  catch (resp) {
    dispatch({ type: types.LOGIN_FAILURE, data: resp })
  }
}

export const logout = () => async (dispatch) => {

  dispatch({ type: types.LOGOUT_REQUEST })
  try {
    await Auth.logout()
    dispatch({ type: types.LOGOUT_SUCCESS })
  }
  catch (error){
    dispatch({ type: types.LOGOUT_FAILURE, data: error })
  }
}
