import { Outlet } from "react-router-dom";
import HeaderTop from "../../components/admin/HeaderTop";
import { GlobalStyle, MainContainer, MenuContainer } from "../Style/style";
import Header from "../../components/administrator/Header";

const Administrator = () => {
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

export default Administrator;
