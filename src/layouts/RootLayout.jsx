import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
    return (
        <div className="font-inter">
            <Navbar/>
            <Outlet/>
            <ToastContainer/>
        </div>
    );
};

export default RootLayout;