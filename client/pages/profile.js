import React, { useEffect } from 'react'
import Head from 'next/head'
import AppLayout from '../components/App.Layout'
import { FollowerList, FollowingList, NicknameEditForm } from '../components/profiles'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import axios from 'axios'
import { LOAD_MYINFO_REQUEST } from '../store/types'
import { END } from 'redux-saga'
import wrapper from '../store/configureStore'

function profile() {


  const { me } = useSelector((state) => state.user)


  useEffect(() => {

    if (! me?.id) {
      alert('로그인이 필요합니다.')
      Router.push('/')
    }

  }, [ ])

  // if (!me) {
  //   return (null)
  // }

  return (
    <>
      {me && <>  <Head>
        <title>내 프로필 | sns </title>
      </Head>
        <AppLayout auth={true}>
          <NicknameEditForm />
          <FollowingList header="팔로잉 목록" data={me.Followings} />
          <FollowerList header="팔로워 목록" data={me.Followers} />
        </AppLayout>
      </>}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(

  (store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie
    }
    // store.dispatch({ type: LOAD_POST_REQUEST });

    store.dispatch({ type: LOAD_MYINFO_REQUEST });

    store.dispatch(END);

    await store.sagaTask.toPromise();

  }

);

export default profile
