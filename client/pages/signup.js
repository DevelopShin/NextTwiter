import AppLayout from '../components/App.Layout'
import Signup from '../components/SignUp'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import React,{useEffect} from 'react'
import axios from 'axios'
import { LOAD_MYINFO_REQUEST } from '../store/types'
import { END } from 'redux-saga'
import wrapper from '../store/configureStore'

function signup() {
  const {signUpDone,signUpData,signUpErr,me} = useSelector((state)=>state.user)

  useEffect(() => {
    console.log(me)
    if (me && me.id) {
      Router.push('/');
    }
  }, [me && me.id]);
  return (
    <AppLayout>
        <Signup/>
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(

  (store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie
    }

    store.dispatch({ type: LOAD_MYINFO_REQUEST });

    store.dispatch(END);

    await store.sagaTask.toPromise();

  }

);


export default signup
