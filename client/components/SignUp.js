import { Form, Input, Button, Checkbox } from 'antd'
import Router from 'next/router'
import React, { useState, useCallback, useEffect,useRef } from 'react'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import {signUpAction} from '../store/actionList'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
const Err = styled.p`
  color: red;
`
function Signup() {
  const mounted = useRef(false)
  const {signUpDone,signUpData,signUpErr,me} = useSelector((state)=>state.user)


  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(()=>{
    if(!mounted.current){
      mounted.current=true
    }else{
      if(signUpDone){
        alert('회원가입성공')
        Router.replace('/')
      }
    }

  },[signUpDone])

  useEffect(()=>{
    if(!mounted.current){
      mounted.current=true

    }else{
      if(signUpErr){
        alert(signUpErr)
      }
    }
   
  },[signUpErr])

  const dispatch = useDispatch()
  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('') //hooks form
  const [password, onChangePassword] = useInput('')

  const [checkPassword, setCheckPassword] = useState('')
  const [passwordErr, setpasswordErr] = useState(false)

  const onChangeCheckPassword = useCallback((e) => {
    setCheckPassword(e.target.value)
    setpasswordErr(e.target.value !== password)
  }, [password])

  const [ischeck, setisCheck] = useState('')
  const [ischeckErr, setisCheckErr] = useState(false)
  const onChangeIscheck = useCallback((e) => {
    setisCheck(e.target.checked)
    setisCheckErr(false)
  }, [])

  const onSubmit = useCallback((e) => {

    if (password !== checkPassword) {
      return setpasswordErr(true)
    }
    else if (!ischeck) {
     return setisCheckErr(true)
    }
    else {
      dispatch(signUpAction({
        email,
        nickname,
        password,
      }))
    }
  }, [password, nickname, checkPassword, ischeck, email])



  return (
      <div>
        <Form onFinish={onSubmit}>
          
        <div>
            <Input placeholder='이메일' name="user-email" type="email" value={email} required onChange={onChangeEmail} />
          </div> <br />

          <div>
            <Input placeholder='닉네임' value={nickname} required onChange={onChangeNickname} />
          </div><br />


          <div>
            <Input placeholder='비밀번호' type='password' value={password} required onChange={onChangePassword} />
          </div><br />

          <div>
            <Input placeholder='비밀번호 확인' type='password' value={checkPassword} required onChange={onChangeCheckPassword} />
            {passwordErr && <Err>비밀번호가 일치 하지 않습니다</Err>}
          </div><hr />

          <div>
            <Checkbox checked={ischeck} onChange={onChangeIscheck}>동의 합니다</Checkbox>
            {ischeckErr && <Err>가입 확인 해주세요 </Err>}
            <Button type='primary' htmlType='submit' > 가입</Button>
          </div>
        </Form>
        {/**폼데이터 출력 테스트 */}

      </div>
  )
}

export default Signup
