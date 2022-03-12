import {all, fork,take,takeLatest, takeEvery,throttle, call, put, delay} from 'redux-saga/effects'

// fork: 비동기, call:동기,
// takeLatest: 여러번 요청하였을때 마지막 요청만 보여준다.
// throttle:일정 주기마다 요청 할수 있게.
import userSaga from './user'
import postSaga from './post'
import loadDataSaga from './loadData'

import axios from 'axios'

axios.defaults.withCredentials = true

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(loadDataSaga)
  ])
}