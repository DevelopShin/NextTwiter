import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Card, Avatar, Button } from 'antd';
import axios from 'axios';
import { PostCard } from '../../components';
import { UserBorder } from '../../components/style';
import { END } from 'redux-saga'
import wrapper from '../../store/configureStore'
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/App.Layout';
function User() {
  const { userInfo, me } = useSelector((state) => state.user)
  const {mainPosts} = useSelector((state)=>state.post)
  const dispatch = useDispatch()
  const router = useRouter();
  const { userId } = router.query
  // const fetcher = (url)=> axios.get(url,{withCredentials:true}). then((result)=>result.data)
  const loadUserPost = useCallback(() => {
    dispatch({
      type: 'LOAD_USER_POST_REQUEST',
      userId:userId,
    })
  },[userId])

  return (
    <AppLayout userPrNone={me?.id === userInfo.id ? false : true}>
      {me?.id === userInfo.id ? null
        :
        <div>
          <Card
            actions={[
              <div key="twit" >
                게시글 <br />{userInfo.Posts.length}
              </div>,
              <div key="followings" >팔로잉<br />{userInfo.Followings.length}</div>,
              <div key="followings" >팔로워 <br />{userInfo.Followers.length}</div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar style={{ cursor: 'pointer' }}>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
              description={userInfo.descrip ? userInfo.descrip : "your description"} />
          </Card>
          <br />
        </div>
      }
      <UserBorder>
        {!mainPosts[0] && <Button className='show-post' onClick={loadUserPost} type='primary'> 포스트 보기 </Button>}

        {mainPosts &&
          mainPosts.map((p) => (
            <div key={p.id}>
              <PostCard post={p} />

            </div>

          ))
        }
      </UserBorder>


    </AppLayout>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(

  (store) => async ({ req, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie
    }
    store.dispatch({ type: 'LOAD_USER_REQUEST', payload: { userId: params.userId } });

    store.dispatch({ type: 'LOAD_MYINFO_REQUEST', });

    store.dispatch(END);

    await store.sagaTask.toPromise();

  }

);

export default User