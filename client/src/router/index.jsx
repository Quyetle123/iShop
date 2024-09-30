/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";
import Admin from "../pages/admin/index.jsx";
import Login from "../pages/loginAndRegister/login.jsx";
import Register from "../pages/loginAndRegister/resgister.jsx";
import Main from "../pages/main/index.jsx";
import AddCategory from "../components/admin/addcategory.jsx";
import AllCategories from "../components/admin/allCategories.jsx";
import UpdateCategory from "../components/admin/updateCategory.jsx";
import AddProduct from "../components/admin/addProduct.jsx";
import Allproduct from "../components/admin/allProduct.jsx";
import UpdateProduct from "../components/admin/updateProduct.jsx";
import Home from "../components/main/Home";
import Detail from "../components/main/Detail/index.jsx";
import HomeAdmin from "../components/admin/Home/index.jsx";

const MainLayout = () => {
  return <Outlet />;
};

export default createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <Main />,
        path: "/",
        children: [
          {
            element: <Home />,
            path: '/'
          },
          {
            element: <Detail />,
            path: '/detail/:id'
          }
        ],
      },
      {
        element: <Admin />,
        path: "/admin",
        children: [
          {
            element: <HomeAdmin />,
            index: true
          },
          {
            element: <AddCategory />,
            path: "/admin/addCategory",
          },
          {
            element: <AllCategories />,
            path: "/admin/allCategories",
          },
          {
            element: <UpdateCategory />,
            path: "/admin/updateCategory/:id",
          },
          {
            element: <AddProduct />,
            path: "/admin/addProduct",
          },
          {
            element: <Allproduct />,
            path: "/admin/allProduct",
          },
          {
            element: <UpdateProduct />,
            path: "/admin/updateProduct/:id",
          },
        ],
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Register />,
        path: "/register",
      },
    ],
  },
]);
