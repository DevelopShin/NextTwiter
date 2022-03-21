// import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons/lib/icons';
import {default as EllipsisOutlined}from '@ant-design/icons/lib/icons/EllipsisOutlined';
import {default as HeartOutlined}from '@ant-design/icons/lib/icons/HeartOutlined';
import {default as HeartTwoTone}from '@ant-design/icons/lib/icons/HeartTwoTone';
import {default as MessageOutlined}from '@ant-design/icons/lib/icons/MessageOutlined';
import {default as RetweetOutlined}from '@ant-design/icons/lib/icons/RetweetOutlined';


import { Card, Button, Avatar, Popover, Comment, Tooltip,  message} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { removePost } from '../../store/actionList';
import {PostHeader} from './PostHeader';
import { CardContainer, CommentContents, CommentContainer } from './style';
import { RETWEET_REQUEST } from '../../store/types';
import { useRouter } from 'next/router'
import moment from 'moment'
import "moment/locale/ko";
import EditPost from './EditPostForm';
import Report from './Report';


export function Cards(props) {


  const dispatch = useDispatch()
  const post = props.post
  const myId = useSelector((state) => state.user.me?.id)
  const {retweetDone, retweetPostId} = useSelector((state) => state.post)
  const liked = post.Likers.find((v) => v.id === myId)

  const router = useRouter('')
  const onClickRouter = useCallback((id) => {
    router.push(`/user/${id}`)
  },[])

  useEffect(()=>{
    if(retweetDone && retweetPostId===post.id){
      message.success(`<${post.User.nickname}> 님의 글을 리트윗 하였습니다.`)
    }
  },[retweetDone,retweetPostId]) 

  const onToggleLike = useCallback(() => {
    if (!myId) {
      return alert('로그인이필요합니다.')
    }
    dispatch({
      type: 'LIKE_POST_REQUEST',
      payload: { PostId: post.id, type: liked ? 'UNLIKE' : 'LIKE' }
    })

  }, [myId])

  const [showEdit, setShowEdit] = useState(false)
  const onEditPost = useCallback(()=>{
    set
  })

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
      <Card 
        cover={post.Images && post.Images[0] && <PostImages retweet={false} images={post.Images} />}
        actions={[
          <Tooltip title={'리트윗'}><RetweetOutlined key='retweet' onClick={onChagneRetweet} /></Tooltip>
          ,
          liked
            
            ? <div onClick={onToggleLike} ><HeartTwoTone  twoToneColor='#FF0000' key='liked' /> { post.Likers.length}</div >
            : <div onClick={onToggleLike} ><HeartOutlined  key='unliked' /> { post.Likers.length}</div>,

            <div onClick={onToggleComment} ><MessageOutlined  key='comment' /> {post.Comments.length}</div>,

          <Popover key='morecontent' content={(
            <ButtonGroup>
              {myId && post.User.id == myId
                ? <>
                  <Button onClick={()=>setShowEdit(true)}>수정</Button>
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
          description={<PostCardContent  postId={post.id} postContent={post.content} />}
        />

      </Card>
      {showEdit &&
        <EditPost post={post} setShowEdit={setShowEdit} showEdit={showEdit} />
      }
      {
        commentFormOppened
        &&
        <CommentContainer>
          <CommentForm post={post} />

          {post.Comments[0]
            ? <CommentContents
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
