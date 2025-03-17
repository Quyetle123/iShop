import { Outlet } from "react-router-dom";
import HeaderComponent from "../../layout/main/Header";
import FooterComponent from "../../layout/main/Footer";

const Main = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default Main;
