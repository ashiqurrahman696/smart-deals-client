import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../components/Home/Home";
import AllProducts from "../components/AllProducts/AllProducts";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import MyProducts from "../components/MyProducts/MyProducts";
import MyBids from "../components/MyBids/MyBids";
import PrivateRoute from "./PrivateRoute";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import AddProduct from "../components/AddProduct/AddProduct";
import UpdateProduct from "../components/UpdateProduct/UpdateProduct";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/all-products",
                element: <PrivateRoute>
                    <AllProducts/>
                </PrivateRoute>,
            },
            {
                path: "/add-product",
                loader: () => fetch("/category.json"),
                element: <PrivateRoute>
                    <AddProduct/>
                </PrivateRoute>,
            },
            {
                path: "/update/:id",
                loader: ({params}) => fetch(`https://smart-deals-server-beryl.vercel.app//products/${params.id}`),
                element: <PrivateRoute>
                    <UpdateProduct/>
                </PrivateRoute>,
            },
            {
                path: "/product-detail/:id",
                loader: ({params}) => fetch(`https://smart-deals-server-beryl.vercel.app/products/${params.id}`),
                element: <PrivateRoute>
                    <ProductDetail/>
                </PrivateRoute>,
            },
            {
                path: "/my-products",
                element: <PrivateRoute>
                    <MyProducts/>
                </PrivateRoute>,
            },
            {
                path: "/my-bids",
                element: <PrivateRoute>
                    <MyBids/>
                </PrivateRoute>,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: "/login",
                Component: Login,
            },
        ],
    },
]);