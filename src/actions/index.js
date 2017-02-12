import { actionTypes as types, urls } from '../constants'
import { get, post } from '../helpers'

export const login = ({ email, password }) => async (dispatch, getState) => {
  
  dispatch({ type: types.LOGIN_REQUEST })

  const resp = await post({
    url: urls.LOGIN,
    body: { email, pwd: password },
    success: types.LOGIN_REQUEST,
    failure: types.LOGIN_FAILURE,
    dispatch,
  })

  if(typeof resp.token === 'undefined') {
    dispatch({ type: types.LOGIN_FAILURE, data: resp })
    return
  }

  return get({
    url: urls.LOGIN_WITH_TOKEN,
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    token: resp.token,
    dispatch,
  })
}

export const loginWithToken = () => (dispatch, getState) => {
  const token = getState().user.token
  
  if (typeof token === 'undefined') return

  dispatch({ type: types.LOGIN_REQUEST })
  return get({
    url: urls.LOGIN_WITH_TOKEN,
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    token: token,
    dispatch,
  })
}

export const logout = () => (dispatch, getState) => {
  const token = getState().user.token
  
  dispatch({ type: types.LOGOUT_REQUEST })
  return post({
    url: urls.LOGOUT,
    body: {},
    success: types.LOGOUT_SUCCESS,
    failure: types.LOGOUT_FAILURE,
    token: token,
    dispatch,
  })
}