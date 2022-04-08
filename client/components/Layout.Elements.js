import styled from 'styled-components'
import { Menu, Input, Row, Col, Button } from 'antd'

export const Warapper=styled.div`
  width: 100%;
  min-height: 1300px;
  /* text-align: center; */
  /* margin: 0 auto; */
  background-color: #f6f2;
`
export const HeaderContainer = styled.div`
  /* width: 100%; */
  min-width: 360px;
  background-color: #fff;
  border-bottom: 1px solid gray;

`
export const MenuStyle = styled(Menu)`
  z-index: 1;
  margin: 0 auto;
  a{
    font-weight: bold;
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  min-width: 360px;
  padding:30px 5px;
  
  @media screen and (max-width: 767px){
  padding:0;

  .info{
    position: sticky;
    top: -97px;
    z-index: 111;
    /* border-bottom: solid 3px gray; */
  };

  }
`

export const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

export const Sticky = styled.div`
  /* min-width: 231px; */
  position: sticky;
  top: 10px;

  @media screen and (max-width: 767px){
    .login-form{
      display: none ;
  };
  margin-bottom: 10px;
  
  }

`


export const ButtonModal= styled(Button)`
  position:'absolute';
  top:'7px';
  right:'5px'
`