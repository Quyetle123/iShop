import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f6f9;
  }
`;

export const MenuContainer = styled.div`
    display: flex;
    width: 100%;
`;
export const MainContainer = styled.div`
    width: calc(100% - 250px);
    margin-left: 250px;
`