import { LOGIN_REQUEST,SIGNUP_REQUEST, LOGOUT_REQUEST, CHANGE_NICKNAME } from "../types"


export const loginAction = (data) => {
  return {
    type: LOGIN_REQUEST,
    payload: data

  }
}

export const logoutAction = () => {
  return {
    type: LOGOUT_REQUEST,
  }
}

export const signUpAction = (data)=> {

  return {
    type: SIGNUP_REQUEST,
    payload: data
  }
}

