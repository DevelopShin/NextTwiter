import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from '../components/App.Layout'
import PostForm from '../components/post/PostForm'
import PostCard from '../components/post/PostCard'
import { LOAD_MYINFO_REQUEST, LOAD_POST_REQUEST, LOAD_USER_REQUEST } from '../store/types'
import wrapper from '../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'
function Home() {
  const { me } = useSelector((state) => state.user)
  const { mainPosts, hasMorePost, loadPostLoading, retweetErr } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const lastId = mainPosts[mainPosts.length - 1]?.id


  useEffect(() => {
    function onScroll() {
      window.scrollY
      if (
        (window.scrollY +
          document.documentElement.clientHeight) >
        document.documentElement.scrollHeight - 100) {
        if (!hasMorePost && !loadPostLoading) {

          dispatch({
            type: LOAD_POST_REQUEST,
            lastId: lastId
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [loadPostLoading])

  useEffect(() => {
    if (retweetErr) {
      alert(retweetErr)
    }
  }, [retweetErr])
  return (
    <div>
      <AppLayout appName={'sns'} auth={true}>
        {me?.id && <PostForm />}
        {mainPosts.map((post, index) => <PostCard key={post.id} post={post} />)} {/*after from to key = {post.id}  change*/}

      </AppLayout>

    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(

  (store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    console.log('index cookie: ', cookie)
    if (req && cookie) {

      axios.defaults.headers.Cookie = cookie
    }
    store.dispatch({ type: LOAD_POST_REQUEST });

    store.dispatch({ type: LOAD_MYINFO_REQUEST });

    store.dispatch(END);

    await store.sagaTask.toPromise();

  }

);


export default Home
