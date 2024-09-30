import { Outlet } from "react-router-dom";
import FooterComponent from "../../components/main/Footer";
import HeaderComponent from "../../components/main/Header";

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
