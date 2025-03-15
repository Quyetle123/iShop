import { Outlet } from "react-router-dom";
import HeaderTop from "../../components/admin/HeaderTop";
import { GlobalStyle, MainContainer, MenuContainer } from "../Style/style";
import Header from "../../components/administrator/Header";
import { SidebarProvider } from "../../context/SidebarContext";

const Administrator = () => {
  return (
    <SidebarProvider>
      <GlobalStyle />
      <MenuContainer>
        <Header />
        <MainContainer>
          <HeaderTop />
          <Outlet />
        </MainContainer>
      </MenuContainer>
    </SidebarProvider>
  );
};

export default Administrator;
