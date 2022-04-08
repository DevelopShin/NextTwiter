import React,{useState, useCallback, useEffect,useRef} from 'react';
import {Input, Form,Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import {useDispatch} from 'react-redux'
import {loginAction} from '../store/actionList'
import { useSelector } from 'react-redux';
import Router from 'next/router';
const FormStyle = styled(Form)`
  max-Width: 600px;
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


function LoginForm() {
  const mounted = useRef(false)

  const dispatch = useDispatch()
  const {loginLoading,loginErr, me} = useSelector((state)=> state.user)
  const [email, setEmail] = useState('')
  const onChangeEmail = useCallback((e)=>{
    setEmail(e.target.value)
  },[])

  useEffect(()=>{
    if(!mounted.current){
      mounted.current=true

    }else{
      if(loginErr){
        console.log(loginErr)
        alert(loginErr)
      }
    }
  },[loginErr])

  useEffect(()=>{
    if(me?.id){
      Router.replace('/')
    }
  },[me?.id])

  const [password, setpassword] = useState('')
  const onChangePassword =useCallback((e)=>{
    setpassword(e.target.value)
  },[])

  const onSubmitForm = useCallback(()=>{
    // console.log([email,password])
    dispatch(loginAction({email, password}));
  },[email,password])

  
  return (
    <FormStyle onFinish={onSubmitForm}>
      <div>
        <label htmlFor='user-email'>이메일</label>
        <br />
        <Input 
          name='user-id'
          type='email'
          value={email} 
          onChange={onChangeEmail} 
          required
        />
      </div>
      <div>
        <label htmlFor='user-email'>비밀번호</label>
        <br />
        <Input 
          name='user-password' 
          type='password' 
          value={password} 
          onChange={onChangePassword} 
          required
        />
      </div>
      
      <Submit >
        <div className='btns'>
        <Button><Link href='/signup'><a>회원가입</a></Link></Button>
          <Button type='primary' htmlType='submit'>로그인</Button>
        </div>
        <p><Link href='/signup'><a>비밀번호찾기</a></Link></p>
      </Submit>

    </FormStyle>
  )
}

export default LoginForm
