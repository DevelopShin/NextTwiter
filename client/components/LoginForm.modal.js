import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Form, message } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import {loginAction} from '../store/actionList'
import Router from 'next/router';

const FormStyle = styled(Form)`
max-Width: 500px;
.login_messeage{
  font-size: 10px;
  color: red;
}
`
const Submit = styled.div`

margin-Top:15px;
/* margin: 0 auto; */
.btns{
  display: flex;
  justify-content: space-between;
}
p>a{
  font-size: 12px;
}
`
function LoginModal({ isModalVisible, setIsModalVisible }) {

  const mounted = useRef(false)
  const dispatch = useDispatch()
  const { loginLoading, loginErr, me } = useSelector((state) => state.user)
  const [loginMsg, setLoginMsg] = useState('')
  const [email, setEmail] = useState('')
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true

  //   } else {
  //     if (loginErr) {
  //       setLoginMsg(loginErr)
  //       setTimeout(()=>{
  //         setLoginMsg('')
  //       },2500)
  //     }0
  //   }
  // }, [loginErr])


  useEffect(() => {
    if (me?.id) {
      setIsModalVisible(false)
      // Router.replace('/')
    }
  }, [me?.id])

  const [password, setpassword] = useState('')
  const onChangePassword = useCallback((e) => {
    setpassword(e.target.value)
  }, [])

  const onSubmitForm = useCallback(() => {
    // console.log([email,password])
    dispatch(loginAction({ email, password }));

  }, [email, password, me, loginErr])



  return (
    <Modal
      title="로그인"
      visible={isModalVisible}
      onOk={onSubmitForm}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="modal_cancel" onClick={() => setIsModalVisible(false)}>
          취소
        </Button>,
        <Button key="modal_submit" type="primary" loading={loginLoading ? 1: 0} onClick={onSubmitForm}>
          로그인
        </Button>,
        <p key='modal_singup'><Link href='/signup'><a>회원가입</a></Link></p>,

      ]}
     
    >
      <FormStyle key='modal_form_contain'>
        <div key='modal_form'>
          <label htmlFor='user-email1'>이메일</label>
          <br />

          <Input
            name='user-id'
            type='email'
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor='user-email2'>비밀번호</label>
          <br />
          <Input
            name='user-password'
            type='password'
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>

      </FormStyle>

    </Modal>
  )
}

export default React.memo(LoginModal)
