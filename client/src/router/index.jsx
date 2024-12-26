/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";
import Admin from "../pages/admin/index.jsx";
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
import Cart from "../components/main/Cart/index.jsx";
import MyOrder from "../components/main/MyOrder/index.jsx";
import Comment from "../components/main/Comment/index.jsx";
import AllOrder from "../components/admin/AllOrder/index.jsx";
import AddStore from "../components/admin/AddStore/index.jsx";
import BranchAndStore from "../components/admin/BranchAndStore/index.jsx";
import AdminRoute from "./adminRoute.jsx";
import UserRoute from "./userRoute.jsx";
import UserLoginRoutes from "./userLoginRoutes.jsx";
import ColorManager from "../components/admin/ColorManager/index.jsx";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/resgister.jsx";
import Shop from "../components/main/FilterCategory/index.jsx";

const MainLayout = () => {
  return <Outlet />;
};

export default createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: (
          <UserRoute>
            <Main />
          </UserRoute>
        ),
        path: "/",
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <Shop />,
            path: "/shop",
          },
          {
            element: <Detail />,
            path: "/detail/:id",
          },
          {
            element: (
              <UserLoginRoutes>
                <Cart />
              </UserLoginRoutes>
            ),
            path: "/cart",
          },
          {
            element: (
              <UserLoginRoutes>
                <MyOrder />
              </UserLoginRoutes>
            ),
            path: "/myOrder",
          },
          {
            element: (
              <UserLoginRoutes>
                <Comment />
              </UserLoginRoutes>
            ),
            path: "/comment/:productColorid",
          },
        ],
      },
      {
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
        path: "/admin",
        children: [
          {
            element: <HomeAdmin />,
            index: true,
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
          {
            element: <AllOrder />,
            path: "/admin/allOrder",
          },
          {
            element: <AddStore />,
            path: "/admin/addStore",
          },
          {
            element: <BranchAndStore />,
            path: "/admin/branch-store",
          },
          {
            element: <ColorManager />,
            path: "/admin/colorManager",
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
