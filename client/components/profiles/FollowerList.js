import React, { useCallback } from 'react'
import { List, Button, Card, Avatar } from 'antd'
import {default as CloseOutlined } from '@ant-design/icons/lib/icons/CloseOutlined'
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
function FollowerList(props) {

  const router = useRouter('')
  const onClickRouter = useCallback((id) => {
    router.push(`user/${id}`)
  }, [])
  return (
    <div>
      <ListStyle
        grid={{ column: 3, xs: 2, sm: 2 }}
        header={<div>{props.header}</div>}
        loadMore={<div className='more-btn'><Button>더보기</Button></div>}
        bordered
        dataSource={props.data}

        renderItem={(item) => (
          <List.Item style={{ margin: 20 }}>

            <UserPr key={item.id}>
              <Avatar className='avatar' onClick={() => onClickRouter(item.id)}>{item.nickname[0]}</Avatar>
              <p>{item.nickname}</p>
              <Button shape="circle" icon={<CloseOutlined />} />
            </UserPr>
          </List.Item>
        )}
      >

      </ListStyle>
    </div>
  )
}

export default FollowerList
