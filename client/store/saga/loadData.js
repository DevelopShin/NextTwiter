import { all, fork, take, takeLatest, takeEvery, throttle, call, put, delay } from 'redux-saga/effects'
import {
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
  LOAD_USER_POST_REQUEST, LOAD_USER_POST_SUCCESS, LOAD_USER_POST_FAIL,
  LOAD_MYINFO_REQUEST, LOAD_MYINFO_SUCCESS, LOAD_MYINFO_FAIL,
  HASHTAG_POST_REQUEST, HASHTAG_POST_SUCCESS, HASHTAG_POST_FAIL,

} from '../types'

import axios from 'axios'


function loadMyInfoAPI() {return axios.get('/api/user/myinfo')}

function* loadMyInfo() {
  try {

    const result = yield call(loadMyInfoAPI)
    yield put({
      type: LOAD_MYINFO_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    console.log('load err ', err)
    yield put({
      type: LOAD_MYINFO_FAIL,
      payload: err.response.data
    })
  }
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MYINFO_REQUEST, loadMyInfo)
}

///////// USER POST
function loadUserPostAPI(data) {return axios.get(`/api/user/userpost/${data}`)}
function* loadUserPost(action) {
  try {

    const result = yield call(loadUserPostAPI,action.userId)
    yield put({
      type: LOAD_USER_POST_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    console.log(err)
    yield put({
      type: LOAD_USER_POST_FAIL,
      payload: err.response.data
    })
  }
}
function* watchLoadUserPost() {
  yield takeLatest(LOAD_USER_POST_REQUEST, loadUserPost)
}


// 유저정보
function loadUserAPI(data) {return axios.get(`/api/user/userinfo/${data.userId}`)}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI,action.payload)
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    console.log(err)
    yield put({
      type: LOAD_USER_FAIL,
      payload: err.response.data
    })
  }
}
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

// shearch hashtag

function shearchHashtagAPI(data) {return axios.get(`/api/hashtag/post?hashtag=${encodeURIComponent(data)}`)}
function* shearchHashtag(action) {
  try {

    const result = yield call(shearchHashtagAPI,action.hashtag)
    yield put({
      type: HASHTAG_POST_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    console.log(err)

    yield put({
      type: HASHTAG_POST_FAIL,
      payload: err.response.data
    })
  }
}
function* watchHashtagPost() {
  yield takeLatest(HASHTAG_POST_REQUEST, shearchHashtag)
}


export default function* loadDataSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLoadMyInfo),
    fork(watchLoadUserPost),
    fork(watchHashtagPost)
  ])
}