import { Outlet } from "react-router-dom";
import Header from "../../layout/admin/Header";
import HeaderTop from "../../layout/admin/HeaderTop";
import {
  GlobalStyle,
  MainContainerWithContext,
  MenuContainer,
} from "../Style/style";
import { SidebarProvider } from "../../context/SidebarContext";

const Admin = () => {
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

export default Admin;
