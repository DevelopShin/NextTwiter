import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd'
import UserProfile from './profiles/UserProfile'
import LoginForm from './LoginForm'
import { HeaderContainer, MenuStyle, SearchInput, Warapper, Container, Sticky } from './Layout.Elements'
import {useSelector, useDispatch} from 'react-redux'
import GlobalStyle from '../globalStyle'
import useInput from '../hooks/useInput'
import { useRouter } from 'next/router'
function AppLayout({userPrNone, children}) {
  const dispatch = useDispatch()

  // const [loginDone, setloginDone] = useState(false)
  const {loginDone, me} = useSelector(state => state.user);
  const [text, onChangeText] = useInput("")
  const router = useRouter()
  const onSearch = () => {router.push(`/hashtag/${text}`)}
  
  return (
    <Warapper className='you?'>
      <GlobalStyle/>
      <HeaderContainer>
        <MenuStyle key='l1' mode='horizontal' >
          <Menu.Item key='m'>
            <Link href='/'><a>Home</a></Link>
          </Menu.Item >

          <Menu.Item key='m1'>
            <Link href='/profile'><a>Profile</a></Link>
          </Menu.Item >

          <Menu.Item key='input' >
            <SearchInput key="input" value={text} onChange={onChangeText} onSearch={onSearch} />
          </Menu.Item>

        </MenuStyle>
      </HeaderContainer>

      <Container>
        <Row gutter={5} className='row'> {/*xs sm md lg xl xxl*/}
          {userPrNone&&  userPrNone ? null : <Col xs={24} sm={8} lg={6} className='info'> {(loginDone || me ) ? <Sticky><UserProfile/></Sticky> :<Sticky><LoginForm /></Sticky> }</Col>}
          <Col xs={24} sm={16} lg={18}className='contants'> {children}  </Col>
          {/* <Col xs = {24} md={4}>cnrk</Col> */}
        </Row>
      </Container>
    </Warapper>
  )
}
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default AppLayout
