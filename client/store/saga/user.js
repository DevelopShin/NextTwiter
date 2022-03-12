import { all, fork, take, takeLatest, takeEvery, throttle, call, put, delay } from 'redux-saga/effects'
import { 
  LOGIN_REQUEST, LOGIN_FAIL,LOGIN_SUCCESS,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL,
  CHANGENICKNAME_REQUEST, CHANGENICKNAME_SUCCESS, CHANGENICKNAME_FAIL,  
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAIL,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAIL,
} from '../types'

import axios from 'axios'
import { BACK_URL } from '../../config/config'

axios.defaults.baseURL = BACK_URL

// fork: 비동기, call:동기,
// takeLatest: 여러번 요청하였을때 마지막 요청만 보여준다.
// throttle:일정 주기마다 요청 할수 있게.




/////////////로그인
function logInAPI(data) {return axios.post('/api/user/login', data)}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload)
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    yield put({
      type: LOGIN_FAIL,
      payload: err.response.data
    })
  }
}
function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, logIn)
}


// 로그아웃
function logOutAPI() {
  return axios.post('/api/user/logout')
}

function* logOut() {
  try {
    const result = yield call(logOutAPI)
    yield put({
      type: LOGOUT_SUCCESS,
      payload: null
    })
  } catch (err) {

    yield put({
      type: LOGOUT_FAIL,
      payload: err.response.data
    })
  }
}
function* watchLogOut() {
  yield takeEvery(LOGOUT_REQUEST, logOut)
}


//회원가입
function signUpAPI(data) {
  return axios.post('/api/user/signup', data)
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI,action.payload)

    yield put({
      type: SIGNUP_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    yield put({
      type: SIGNUP_FAIL,
      payload: err.response.data
    })
  }
}
function* watchSignUp() {
  yield takeEvery(SIGNUP_REQUEST, signUp)
}


//닉네임 

function changenicknameAPI(data) {return axios.patch('/api/user/newname', data)}

function* changeNickname(action) {
  try {
    const result = yield call(changenicknameAPI, action.payload)

    yield put({
      type: CHANGENICKNAME_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    yield put({
      type: CHANGENICKNAME_FAIL,
      payload: err.response.data
    })
  }
}
function* watchChangeNickname() {
  yield takeEvery(CHANGENICKNAME_REQUEST, changeNickname)
}


//////////////////////////////////////////////////////팔로우
function followAPI(data) {
  return axios.patch('/api/user/follow',data)
}
function* follow(action) {

  try {
    const result = yield call(followAPI, action)

    yield delay(10)
    yield put({
      type: FOLLOW_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    yield put({
      type: FOLLOW_FAIL,
      payload: err.response.data
    })
  }
}
function* watchFollow() {
  yield takeEvery(FOLLOW_REQUEST, follow)
}


//////////////////////////////////////////////////// 언팔로우
function unfollowAPI(data) {
  return axios.delete(`/api/user/unfollow?userId=${data}`)
}
function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.UserId)

    yield put({
      type: UNFOLLOW_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAIL,
      payload: err.response.data
    })
  }
}
function* watchUnFollow() {
  yield takeEvery(UNFOLLOW_REQUEST, unfollow)
}


//////////////////////////////////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchChangeNickname),
    fork(watchFollow),
    fork(watchUnFollow),
  ])
}