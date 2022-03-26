import styled from 'styled-components'


export const StyledButton = styled.div`

    position: absolute;
    top: 20px;
    right: 10px;

    button{
      background-color: #fff ;
      padding: 1px 2px;
      border: none;
      /* border-bottom: solid 1px #1890ff ; */
      color: #1890ff;
      font-weight: bold ;
    }
  
`

export const UserPr = styled.div`
display: flex;
align-items: center;
border-radius: 1rem;
justify-content: space-between;
height: 32px;
/* width: 130px; */
overflow: hidden;
background-color: #AAC9FF;
p{
  margin:0 5px;
  display: inline;
}
`