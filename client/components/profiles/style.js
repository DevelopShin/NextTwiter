import styled from 'styled-components'


export const StyledButton = styled.div`
  @media screen and (max-width:575px){
    position: absolute;
    top: 15px;
    right: 15px;
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