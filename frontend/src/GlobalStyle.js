import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
   --white: #ffffff;
   --light-grey: #EAEBEA;
   --dark-grey: #6F7370;
   --darkest-grey: #001514;
   --accent-red: #FF0046;
   --accent-green: #00B17C;
  
   --size-xs: 4px;
   --size-s: 8px;
   --size-m: 12px;
   --size-l: 16px;
   --size-lplus: 20px;
   --size-xl: 24px;
   --size-xxl: 32px;
   
   --center-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.37);
   
  }

  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    
    h1,h2,h3,h4,h5,p {
    margin: 0;
    }
  }
  
  body {
  background-color: white;
  }
   
  input, textarea {
    font-size: 1em;
    font-family: inherit;
  }
`;