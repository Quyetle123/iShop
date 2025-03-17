import { Outlet } from "react-router-dom";
import HeaderTop from "../../layout/admin/HeaderTop";
import {
  GlobalStyle,
  MainContainerWithContext,
  MenuContainer,
} from "../Style/style";
import Header from "../../layout/administrator/Header";
import { SidebarProvider } from "../../context/SidebarContext";

const Administrator = () => {
  return (
    <SidebarProvider>
      <GlobalStyle />
      <MenuContainer>
        <Header />
        <MainContainerWithContext>
          <HeaderTop />
          <Outlet />
        </MainContainerWithContext>
      </MenuContainer>
    </SidebarProvider>
  );
};

export default Administrator;
