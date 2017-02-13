import { actionTypes as types, urls } from '../constants'
import { get, post } from '../helpers'

export const login = ({ email, password }) => (dispatch, getState) => {
  const token = getState().user.token

  dispatch({ type: types.LOGIN_REQUEST })
  post({
    url: urls.LOGIN,
    body: { email, pwd: password },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    token: token,
    dispatch,
  })
}

export const loginWithToken = () => (dispatch, getState) => {
  const token = getState().user.token

  if (typeof token === 'undefined') return

  dispatch({ type: types.LOGIN_REQUEST })
  get({
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
  post({
    url: urls.LOGOUT,
    body: {},
    success: types.LOGOUT_SUCCESS,
    failure: types.LOGOUT_FAILURE,
    token: token,
    dispatch,
  })
}
