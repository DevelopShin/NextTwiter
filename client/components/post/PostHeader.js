import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import "moment/locale/ko";

import { ToolTipStyle, ButtonStyle,  HC } from './style';
import { Avatar } from 'antd';

export function PostHeader(props) {
  const dispatch = useDispatch()
  const post = props.post
  const { me, followLoading, unfollowLoading, followId } = useSelector((state) => state.user)
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id)
  const followIdCheck = post.User.id === followId

  const onClickBtn = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: 'UNFOLLOW_REQUEST',
        UserId: post.User.id,
        nickname: post.User.nickname
      })
    } else {
      dispatch({
        type: 'FOLLOW_REQUEST',
        UserId: post.User.id,
        nickname: post.User.nickname
      })
    }
  }, [isFollowing, post.id])
  return (
    <>
      {post.User.nickname}
      {(me?.id && me?.id !== post.User.id) &&
        <>
          &nbsp;&nbsp;&nbsp;
          <ButtonStyle type={isFollowing ? '' : 'primary'} loading={followIdCheck && (followLoading || unfollowLoading)} onClick={onClickBtn}>
            {isFollowing ? ' 언팔로우' : '팔로우'}
          </ButtonStyle>
        </>
      }
      &nbsp;&nbsp;&nbsp;
      {<ToolTipStyle title={moment(post.createdAt).format('YYYY-MM-DD HH:mm')}>
        {moment(post.createdAt).fromNow()}
      </ToolTipStyle>}
    </>
  )
}


export function OwnerInfo(props) {
  const dispatch = useDispatch()
  const post = props.post
  const { me, followLoading, unfollowLoading, followId } = useSelector((state) => state.user)
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id)
  const followIdCheck = post.User.id === followId

  const onClickBtn = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: 'UNFOLLOW_REQUEST',
        UserId: post.User.id,
        nickname: post.User.nickname
      })
    } else {
      dispatch({
        type: 'FOLLOW_REQUEST',
        UserId: post.User.id,
        nickname: post.User.nickname
      })
    }
  }, [isFollowing, post.id])
  return (

    <HC>
      <div>
        <Avatar>{post.User.nickname[0]} </Avatar>{' '}
        {post.User.nickname}
        {(me?.id && me?.id !== post.User.id) &&
          <>
            &nbsp;&nbsp;&nbsp;
            <ButtonStyle type={isFollowing ? '' : 'primary'} loading={followIdCheck && (followLoading || unfollowLoading)} onClick={onClickBtn}>
              {isFollowing ? ' 언팔로우' : '팔로우'}
            </ButtonStyle>
          </>
        }
        &nbsp;&nbsp;&nbsp;
        {<ToolTipStyle title={moment(post.createdAt).format('YYYY-MM-DD HH:mm')}>
          {moment(post.createdAt).fromNow()}
        </ToolTipStyle>}
      </div>
      <p>님의 글을 리트윗 하였습니다.</p>
    </HC>

  )
}