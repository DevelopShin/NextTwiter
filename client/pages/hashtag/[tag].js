
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '../../components/App.Layout';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { PostCard } from '../../components'
import { END } from 'redux-saga'
import wrapper from '../../store/configureStore'
import { BACK_URL } from '../../config/config';

function Hashtag() {
  const dispatch = useDispatch()
  const router = useRouter();
  const { tag } = router.query;
  const {mainPosts} = useSelector((state)=>state.post)
  useEffect(() => {
    // axios.post(`${BACK_URL}/api/hashtag/post`, { hashtag: '고구마', lasId: null })
    //   .then((v) => {
    //     setPost(v.data)
    //   })
    dispatch({
      type:'HASHTAG_POST_REQUEST',
      hashtag:tag

    })
  }, [tag,router.query])


  return (
    <AppLayout auth={true}>
      <div>
        <h2>{'<#'} {tag} {'>'}에 대한 검색결과 </h2>
        {mainPosts &&
          mainPosts.map((p) => (
            <div key={p.id}>
              <PostCard post={p} />

            </div>

          ))
        }
      </div>


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
    // store.dispatch({ type: LOAD_POST_REQUEST });

    store.dispatch({ type: 'LOAD_MYINFO_REQUEST' });

    store.dispatch(END);

    await store.sagaTask.toPromise();

  }

);

export default Hashtag