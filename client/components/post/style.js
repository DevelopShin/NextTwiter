import styled from 'styled-components'
import { Button, Card, Form, Input, List, Tooltip, Upload } from 'antd';

export const HashTag = styled.div`
  display: inline-block;

  &:hover{
    transform: scale(1.1,1.1);
  }
`

export const NotButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -40;
  
`

export const ToolTipStyle = styled(Tooltip)`
  /* font-weight: 200; */
  margin: 0;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 18px;
  color: #ccc;
  white-space: nowrap;
  padding-top: 4px;
  cursor: auto;
`

export const ButtonStyle = styled(Button)`
  padding: 0 10px;
  height:25px;
  border-radius: 8px;
`

export const UploadStyle = styled(Upload)`
  position: relative;
  top: -10px;
`;

export const CardContainer = styled.div`
  margin-bottom: 20px;
`;

export const CommentContainer = styled.div`
  background-color: #0000;

  /* & Form{
    margin: 5px;
  } */
`

export const CommentContents = styled(List)`
  padding: 0 10px;

  li{
  border-bottom: 1px #fff7 solid;
  }
`


export const HC = styled.div`
  display:flex;
  align-items: center;

  div{
  padding-right: 5px;
  border: 2px solid #1890ff;
  border-radius: 1.1rem;
  background-color: #fff3;
  }
  p{
    margin: 0;
  }

`

export const CardStyled = styled(Card)`
  .ant-card-head-title{
    padding: 8px 0;
  }
`