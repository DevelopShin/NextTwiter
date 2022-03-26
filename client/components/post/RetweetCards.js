// import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons/lib/icons';
import {default as EllipsisOutlined}from '@ant-design/icons/lib/icons/EllipsisOutlined';
import {default as HeartOutlined}from '@ant-design/icons/lib/icons/HeartOutlined';
import {default as HeartTwoTone}from '@ant-design/icons/lib/icons/HeartTwoTone';
import {default as MessageOutlined}from '@ant-design/icons/lib/icons/MessageOutlined';
import {default as RetweetOutlined}from '@ant-design/icons/lib/icons/RetweetOutlined';

import { Card, Button, Avatar, Popover, Comment, Tooltip } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { removePost } from '../../store/actionList';
import {PostHeader, OwnerInfo} from './PostHeader';
import { CardContainer, CardStyled, CommentContainer, ListStyle } from './style';
import { RETWEET_REQUEST } from '../../store/types';
import { useRouter } from 'next/router';
import moment from 'moment';
import "moment/locale/ko";
import Report from './Report';
export function RetweetCards(props) {

  const dispatch = useDispatch()
  const post = props.post
  const myId = useSelector((state) => state.user.me?.id)
  const liked = post.Likers.find((v) => v.id === myId)

  const router = useRouter('')
  const onClickRouter = useCallback((id) => {
    router.push(`/user/${id}`)
  },[])
  const onToggleLike = useCallback(() => {
    if (!myId) {
      return alert('로그인이필요합니다.')
    }
    dispatch({
      type: 'LIKE_POST_REQUEST',
      payload: { PostId: post.id, type: liked ? 'UNLIKE' : 'LIKE' }
    })

  }, [myId])


  const [commentFormOppened, setCommentFormOppened] = useState(false)
  const onToggleComment = useCallback(() => {
    setCommentFormOppened((prev) => !prev)
  }, [])


  const onRemovePost = useCallback(() => {
    dispatch(removePost({ PostId: post.id }))
  }, [post.id])


  const onChagneRetweet = () => {
    if (!myId) {
      return alert('로그인이필요합니다.')
    }
    dispatch({
      type: RETWEET_REQUEST,
      payload: { PostId: post.id }
    })
  }
// 신고
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onReport = useCallback(()=>{
    if(!myId){
      return(
        alert('로그인이필요합니다.')
      )
    }
    setIsModalVisible(true)

  })

  return (
    <CardContainer>
      <Report  
        isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
        post = {post}
      />
      <CardStyled
        title={<OwnerInfo post = {post.Retweet}/>}
        cover={post.Retweet.Images && post.Retweet.Images[0] && <PostImages retweet={true} images={post.Retweet.Images} />}
        actions={[
          <Tooltip title='Retweet'><RetweetOutlined key='retweet' onClick={onChagneRetweet} /></Tooltip>,
          liked

            ? <div onClick={onToggleLike} ><HeartTwoTone twoToneColor='#FF0000' key='liked' /> {post.Likers.length}</div >
            : <div onClick={onToggleLike} ><HeartOutlined key='unliked' /> {post.Likers.length}</div>,

          <MessageOutlined onClick={onToggleComment} key='comment' />,

          <Popover key='morecontent' content={(
            <ButtonGroup>
              {myId && post.User.id == myId
                ? <>
                  {/* <Button >수정</Button> */}
                  <Button type='danger' onClick={onRemovePost}>삭제</Button>
                </>
                : <Button type='danger' onClick={onReport}>신고</Button>
              }
            </ButtonGroup>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar style={{cursor: 'pointer'}} onClick={()=>onClickRouter(post.User.id)}>{post.User.nickname[0]}</Avatar>}
          title={<PostHeader post={post} />}
          description={<PostCardContent postId={post.id} postContent={post.Retweet.content || '삭제된 게시글입니다.'} />}
        />

      </CardStyled>
      {
        commentFormOppened
        &&
        <CommentContainer>
          <CommentForm post={post} />

          {post.Comments[0]
            ? <ListStyle
              header={`${post.Comments.length}개의 댓글`}
              itemLayout='horizontal'
              dataSource={post.Comments}
              renderItem={(item) => (
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]} </Avatar>}
                    content={item.content}
                    datetime={
                      <Tooltip title={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <p>{moment(item.createdAt).fromNow()}</p>
                      </Tooltip>
                    }
                  >
                  </Comment>
                </li>
              )}
            />
            : <p>No Comment</p>
          }
        </CommentContainer>}
    </CardContainer>
  )
}
