import { Outlet } from "react-router-dom";
import Header from "../../components/admin/Header";
import HeaderTop from "../../components/admin/HeaderTop";
import { GlobalStyle, MainContainer, MenuContainer } from "./style";

const Admin = () => {
  return (
    <>
      <GlobalStyle />
      <MenuContainer>
        <Header />
        <MainContainer>
          <HeaderTop />
          <Outlet />
        </MainContainer>
      </MenuContainer>
    </>
  );
};

export default Admin;
