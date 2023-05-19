import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import NotFound from "../../Pages/NotFound/NotFound";
import SignUp from "../../Pages/SignUp/SignUp";
import Login from "../../Pages/Login/Login";
import Home from "../../Pages/HomePage/Home/Home";
import Products from "../../Pages/Products/Products";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import DashboardLayout from "../../Pages/Dashboard/DashboardLayout/DashboardLayout";
import MyOrder from "../../Pages/Dashboard/BuyerDashboard/MyOrder/MyOrder"
import AddProduct from "../../Pages/Dashboard/SellerDashBoard/AddProduct/AddProduct"
import MyProduct from "../../Pages/Dashboard/SellerDashBoard/MyProduct/MyProduct"
import AllSeller from "../../Pages/Dashboard/AdminDashboard/AllSeller/AllSeller"
import AllBuyer from "../../Pages/Dashboard/AdminDashboard/AllBuyer/AllBuyer"
import ReportedItem from "../../Pages/Dashboard/AdminDashboard/ReportedItem/ReportedItem"
import DashAuth from "../DashAuth/DashAuth";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },

            {
                path: '/signup',
                element: <SignUp />
            },

            {
                path: '/category/:id',
                element: <PrivateRoute>
                    <Products />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)
            },

            {
                path: '*',
                element: <NotFound />
            }

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        errorElement: <DisplayError />,
        children: [
            //buyer dashbaord
            {
                path: '/dashboard/myOrder',
                element: <DashAuth role="buyer">
                    <MyOrder />
                </DashAuth>
            },
            //seller dashboard
            {
                path: '/dashboard/addProduct',
                element: <DashAuth role="seller">
                    <AddProduct />
                </DashAuth>
            },
            {
                path: '/dashboard/myProduct',
                element: <DashAuth role="seller">
                    <MyProduct />
                </DashAuth>
            },
            //admin dashboard
            {
                path: '/dashboard/allSeller',
                element: <DashAuth role="admin">
                    <AllSeller />
                </DashAuth>
            },
            {
                path: '/dashboard/allBuyer',
                element: <DashAuth role="admin">
                    <AllBuyer />
                </DashAuth>
            },
            {
                path: '/dashboard/reportedItem',
                element: <DashAuth role="admin">
                    <ReportedItem></ReportedItem>
                </DashAuth>
            }
        ]
    }

])

export default router;