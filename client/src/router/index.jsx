/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Admin from '../pages/admin/index.jsx';
import Main from '../pages/main/index.jsx';
import AllCategories from '../components/administrator/AllCategories/index.jsx';
import AddProduct from '../components/administrator/AddProduct/index.jsx';
import UpdateProduct from '../components/administrator/UpdateProduct/index.jsx';
import Home from '../components/main/Home';
import Detail from '../components/main/Detail/index.jsx';
import HomeAdmin from '../components/admin/Home/index.jsx';
import Cart from '../components/main/Cart/index.jsx';
import MyOrder from '../components/main/MyOrder/index.jsx';
import Comment from '../components/main/Comment/index.jsx';
import AllOrder from '../components/admin/AllOrder/index.jsx';
import AddStore from '../components/administrator/AddStore/index.jsx';
import BranchAndStore from '../components/administrator/BranchAndStore/index.jsx';
import AdminRoute from './adminRoute.jsx';
import UserRoute from './userRoute.jsx';
import UserLoginRoutes from './userLoginRoutes.jsx';
import ColorManager from '../components/administrator/ColorManager/index.jsx';
import Login from '../pages/auth/login.jsx';
import Register from '../pages/auth/resgister.jsx';
import Shop from '../components/main/FilterCategory/index.jsx';
import AddPost from '../components/administrator/AddPost/index.jsx';
import AllPost from '../components/administrator/AllPosts/index.jsx';
import UpdatePost from '../components/administrator/UpdatePost/index.jsx';
import WishList from '../components/main/Wishlist/index.jsx';
import AddVourcher from '../components/administrator/AddVourcher/index.jsx';
import AllVourcher from '../components/administrator/AllVourcher/index.jsx';
import CheckoutPage from '../components/main/Pay/index.jsx';
import OrderStatus from '../components/admin/OrderStatus/index.jsx';
import AllProduct from '../components/administrator/AllProduct/index.jsx';
import UpdateCategory from '../components/administrator/UpdateCategory/index.jsx';
import Administrator from '../pages/administrator/index.jsx';
import AdministatorRoute from './administratorRouter.jsx';
import AdminStratorHome from '../components/administrator/Home/index.jsx';
import StockStore from '../components/admin/StockStore/index.jsx';
import AddCategory from '../components/administrator/AddCategory/index.jsx';
import StockHistory from '../components/admin/StockHistory/index.jsx';
import PaymentSuccess from '../components/main/PaymentSuccess/index.jsx';
import PostPage from '../components/main/Post/index.jsx';

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
                path: '/',
                children: [
                    {
                        element: <Home />,
                        path: '/',
                    },
                    {
                        element: <PostPage />,
                        path: '/post/:id',
                    },
                    {
                        element: <Shop />,
                        path: '/:id',
                    },
                    {
                        element: <Detail />,
                        path: '/detail/:id',
                    },
                    {
                        element: (
                            <UserLoginRoutes>
                                <Cart />
                            </UserLoginRoutes>
                        ),
                        path: '/cart',
                    },
                    {
                        element: (
                            <UserLoginRoutes>
                                <WishList />
                            </UserLoginRoutes>
                        ),
                        path: '/wishlist',
                    },
                    {
                        element: (
                            <UserLoginRoutes>
                                <CheckoutPage />
                            </UserLoginRoutes>
                        ),
                        path: '/pay',
                    },
                    {
                        element: (
                            <UserLoginRoutes>
                                <MyOrder />
                            </UserLoginRoutes>
                        ),
                        path: '/myOrder',
                    },
                    {
                        element: (
                            <UserLoginRoutes>
                                <PaymentSuccess />
                            </UserLoginRoutes>
                        ),
                        path: '/pay-success',
                    },
                    {
                        element: (
                            <UserLoginRoutes>
                                <Comment />
                            </UserLoginRoutes>
                        ),
                        path: '/comment/:productColorid',
                    },
                ],
            },
            {
                element: (
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                ),
                path: '/admin',
                children: [
                    {
                        element: <HomeAdmin />,
                        index: true,
                    },
                    {
                        element: <AllOrder />,
                        path: '/admin/allOrder',
                    },
                    {
                        element: <OrderStatus />,
                        path: '/admin/order/:id',
                    },
                    {
                        element: <StockStore />,
                        path: '/admin/storeStock',
                    },
                    {
                        element: <StockHistory />,
                        path: '/admin/stockHistory',
                    },
                ],
            },
            {
                element: (
                    <AdministatorRoute>
                        <Administrator />
                    </AdministatorRoute>
                ),
                path: '/administrator',
                children: [
                    {
                        element: <AdminStratorHome />,
                        index: true,
                    },
                    {
                        element: <AddCategory />,
                        path: '/administrator/addCategory',
                    },
                    {
                        element: <AllCategories />,
                        path: '/administrator/allCategories',
                    },
                    {
                        element: <UpdateCategory />,
                        path: '/administrator/updateCategory/:id',
                    },
                    {
                        element: <AddProduct />,
                        path: '/administrator/addProduct',
                    },
                    {
                        element: <AllProduct />,
                        path: '/administrator/allProduct',
                    },
                    {
                        element: <UpdateProduct />,
                        path: '/administrator/updateProduct/:id',
                    },
                    {
                        element: <AddStore />,
                        path: '/administrator/addStore',
                    },
                    {
                        element: <BranchAndStore />,
                        path: '/administrator/branch-store',
                    },
                    {
                        element: <ColorManager />,
                        path: '/administrator/colorManager',
                    },
                    {
                        element: <AddPost />,
                        path: '/administrator/add-post',
                    },
                    {
                        element: <AllPost />,
                        path: '/administrator/all-posts',
                    },
                    {
                        element: <UpdatePost />,
                        path: '/administrator/update-post/:id',
                    },
                    {
                        element: <AddVourcher />,
                        path: '/administrator/add-vourcher',
                    },
                    {
                        element: <AllVourcher />,
                        path: '/administrator/all-vourchers',
                    },
                ],
            },
            {
                element: <Login />,
                path: '/login',
            },
            {
                element: <Register />,
                path: '/register',
            },
        ],
    },
]);
