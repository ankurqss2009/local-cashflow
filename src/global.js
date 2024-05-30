import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  * {
    font-family: 'Montserrat', sans-serif;
  }

  body,
  html{
    margin: 0;
    background:#2C3E50;
    color : #FFFFFF;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }  

  body{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  .ant-drawer-body {
    overflow: hidden !important;
    padding: 0 10px !important;
  }

  .ant-drawer-content {
    height: 100vh !important;
    overflow: hidden !important;
  }
  .ant-drawer-content-wrapper{
      width:40vw !important;
      min-width:500px;
  }

  .ant-drawer-mask{
    position: static !important;
    background: transparent !important;
  }

  .text-transform{
    text-transform: uppercase;
  }
    
`;
