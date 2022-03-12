import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{  
  text-decoration: none;
  list-style-type: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }
  a{
    cursor: pointer;
    
  }
  html, body{
    background-color: #f6f5f7;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle