import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { SidebarContext } from '../../context/SidebarContext';
import { useContext } from "react";

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
  width: ${({ collapsed }) => (collapsed ? "calc(100% - 80px)" : "calc(100% - 250px)")};
  margin-left: ${({ collapsed }) => (collapsed ? "80px" : "250px")};
  transition: all 0.3s ease;
`;

export const MainContainerWithContext = (props) => {
  const { collapsed } = useContext(SidebarContext);
  return <MainContainer collapsed={collapsed} {...props} />;
};