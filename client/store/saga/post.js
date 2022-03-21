import { all, fork, take, takeLatest, takeEvery, throttle, call, put, delay } from 'redux-saga/effects'
import {
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAIL, 
  ADD_POST_REQUEST, ADD_POST_SUCCESS,  ADD_POST_FAIL,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAIL,
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAIL,
  ADD_POST_TO_ME, REMOVE_POST_OF_ME,
  LIKE_POST_REQUEST, LIKE_POST_FAIL, LIKE_POST_SUCCESS,
  RETWEET_REQUEST, RETWEET_FAIL, RETWEET_SUCCESS,
  EDIT_POST_REQUEST, EDIT_POST_SUCCESS,  EDIT_POST_FAIL,
  REPORT_POST_REQUEST, REPORT_POST_FAIL, REPORT_POST_SUCCESS,

} from '../types'
import axios from 'axios'
import { BACK_URL } from '../../config/config'
axios.defaults.baseURL = BACK_URL

// fork: 비동기, call:동기,
// takeLatest: 여러번 요청하였을때 마지막 요청만 보여준다.
// throttle:일정 주기마다 요청 할수 있게.


const retweetAPI=(data) => {return axios.get(`/api/post/${data.PostId}/retweet`)}
function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.payload)
    yield put(
      {
      type: RETWEET_SUCCESS,
      payload: result.data
    })
    yield put(
      
      {
      type: ADD_POST_TO_ME,
      payload: result.id
    })

  } catch (err) {
    console.log(err)

    yield put({
      type: RETWEET_FAIL,
      payload: err.response.data
    })
  }
}
function* watchretweet() { yield takeEvery(RETWEET_REQUEST, retweet)}


const editPostAPI=(data) => {return axios.patch('/api/post/editpost', data )}
function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.payload)
    yield put(
      {
      type: EDIT_POST_SUCCESS,
      payload: result.data
    })

  } catch (err) {
    console.log(err)

    yield put({
      type: EDIT_POST_FAIL,
      payload: err.response.data
    })
  }
}
function* watcheditPost() { yield takeEvery(EDIT_POST_REQUEST, editPost)}




//////////////////////////api/post add////////////////////////////////////////////////
const addPostAPI=(data) => {return axios.post('/api/post/addpost', data )}
function* addPost(action) {
  try {

    const result = yield call(addPostAPI, action.payload)
    yield put(
      {
      type: ADD_POST_SUCCESS,
      payload: result.data
    })
    yield put(
      
      {
      type: ADD_POST_TO_ME,
      payload: result.id
    })
  } catch (err) {
    console.log(err)

    yield put({
      type: ADD_POST_FAIL,
      payload: err.response.data
    })
  }
}
function* watchAddPost() { yield takeEvery(ADD_POST_REQUEST, addPost)}

////////////////////////// post like////////////////////////////////////////////////
const likePostAPI=(data) => {return axios.post('/api/post/likepost', data )}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.payload)
    yield put(
      {
      type: LIKE_POST_SUCCESS,
      payload: result.data
    })

  } catch (err) {
    console.log(err)

    yield put({
      type: LIKE_POST_FAIL,
      payload: err.response.data
    })
  }
}
function* watchLikePost() {yield takeLatest(LIKE_POST_REQUEST, likePost)}


// REPORT POST  신고

const reportPostAPI=(data) => {return axios.post('/api/post/report', data )}
function* reportPost(action) {
  try {
    const result = yield call(reportPostAPI, action.payload)
    yield put(
      {
      type: REPORT_POST_SUCCESS,
      payload: result.data
    })

  } catch (err) {
    console.log(err)

    yield put({
      type: REPORT_POST_FAIL,
      payload: err.response.data
    })
  }
}
function* watchReportPost() {yield takeLatest(REPORT_POST_REQUEST,reportPost)}


//////////////////////////comment////////////////////////////////////////////////

function addCommentAPI(data) {
  return axios.post('/api/post/comment', data)
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.payload)

    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: result.data
    })
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAIL,
      payload: err.response.data
    })
  }
}
function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment)
}


// delete =======================================================

function removeAPI(data) {
  return axios.post('/api/post/delete', data)
}
function* remove(action) {
  try {
    const result = yield call(removeAPI, action.payload)
    yield put({
      type: REMOVE_POST_SUCCESS,
      payload: result.data  //api/postId
    })

    yield put({
      type: REMOVE_POST_OF_ME,
      payload: result.data //postId
    })

  } catch (err) {
    yield put({
      type: REMOVE_POST_FAIL,
      payload: err.response.data
    })
  }
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, remove)
}

////////////////////////////////////////////////////////////////////////////
function loadPostAPI(lastId) {
  return axios.get(`/api/posts?lastId=${lastId || 0}`)
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI,action.lastId)
    yield put({
      type: LOAD_POST_SUCCESS,
      payload: result.data  //api/postId
    })

  } catch (err) {
    yield put({
      type: LOAD_POST_FAIL,
      payload: err.response.data
    })
  }
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchLikePost),
    fork(watchretweet),
    fork(watcheditPost),
    fork(watchReportPost)


  ])
}