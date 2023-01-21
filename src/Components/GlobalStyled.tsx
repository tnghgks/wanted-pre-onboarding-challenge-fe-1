import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyled = createGlobalStyle`
${reset}

*{
  box-sizing: border-box;
}

body{
  background-color: #89C4E1;
}

button{
  border:none;
  border-radius: 10px;
  background-color: #008CBA;
  color:white;
  padding: 10px 10px;
  font-weight: 700;
  cursor: pointer;
}
a{
  color:inherit;
}
a:hover{
  color:#FFE5F1;
}
`;
