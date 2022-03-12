import React,{useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Card, Button, Avatar} from 'antd'
import { logoutAction } from '../../store/actionList'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import {StyledButton} from './style'
function UserProfile(props) {
  const dispatch = useDispatch()
  const {me,logoutLoading} =useSelector((state)=> state.user)
  const userId = me?.id
  
 const logautHandler = useCallback(()=>{
    dispatch(logoutAction())
  },[])


  return (
    <>
      <Card 
      actions={[
        <div key="twit" >
          <Link href={`/user/${userId}`}><a>
            게시글 <br/>{me?.Posts.length} 
          
          </a></Link> 
          
        </div>,
        <div key="followings" ><Link href='/profile'><a>팔로잉<br/>{me.Followings.length}</a></Link> </div>,
        <div key="followings" ><Link href='/profile'><a>팔로워 <br/>{me.Followers.length}</a></Link></div>,
      ]}
      >
        <Card.Meta 
          avatar={<Avatar style={{cursor: 'pointer'}}><Link href='/profile'><a>{me.nickname[0]}</a></Link></Avatar>}
          title={me.nickname} 
          description={me.descrip ? me.descrip : "your description"}/>
      </Card>
      <StyledButton>
        <Button onClick={logautHandler} loading={logoutLoading}>로그아웃</Button>
      </StyledButton>
      <br/>
    </>
  )
}

export default UserProfile
