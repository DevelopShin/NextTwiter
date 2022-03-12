import React,{useCallback} from 'react'
import { List, Button, Card ,Avatar, Tooltip} from 'antd'
import {default as CloseOutlined } from '@ant-design/icons/lib/icons/CloseOutlined'
import { useSelector, useDispatch } from 'react-redux'
import { UserPr } from './style'
import { useRouter } from 'next/router'
import styled from 'styled-components'
const ListStyle = styled(List)`
  .ant-list-item{
    padding: 0;
    margin:0;
  }
  .more-btn{
    text-align: center;
    margin: 10px;
  }
  .avatar{
    cursor: pointer;
  }
`
function FollowingList(props) {



  const router = useRouter('')
  const onClickRouter = useCallback((id) => {
    router.push(`user/${id}`)
  },[])
  const dispatch = useDispatch()

  const onClickBtn = useCallback((item) => {
    dispatch({
      type: 'UNFOLLOW_REQUEST',
      UserId: item.id,
    })
  }, [])

  return (
    <div>
      <ListStyle
        grid={{ column:3,xs:2, sm:2}}
        header={<div>{props.header}</div>}
        loadMore={<div className='more-btn' ><Button>more</Button></div>}
        bordered
        dataSource={props.data}

        renderItem={(item) => (
          <List.Item style={{ margin: 20 }}>

            <UserPr>
              <Avatar className='avatar' onClick={()=>onClickRouter(item.id)}>{item.nickname[0]}</Avatar>
              <p>{item.nickname}</p>
              <Tooltip title='팔로잉 취소'><Button shape="circle" icon={<CloseOutlined onClick={()=> onClickBtn(item) }/>} /></Tooltip>
            </UserPr>
          </List.Item>

        )}
      />
    </div>
  )
}

export default FollowingList
