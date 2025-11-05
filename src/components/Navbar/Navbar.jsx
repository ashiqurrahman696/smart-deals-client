import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
    const {user, setUser, signOutUser} = use(AuthContext);

    const handleSignOut = () => {
        signOutUser().then(() => {
            setUser(null);
        }).catch((error) => {
            console.log(error.code);
        });
    }

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        {user && <>
            <li><NavLink to="/all-products">All Products</NavLink></li>
            <li><NavLink to="/my-products">My Products</NavLink></li>
            <li><NavLink to="/my-bids">My Bids</NavLink></li>
            <li><NavLink to="/add-product">Add Product</NavLink></li>
        </>}
    </>;
    return (
        <div className="bg-base-100 px-4 border-b border-[#e9e9e9] sticky top-0 z-10">
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">Smart<span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Deals</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <>
                        <button onClick={handleSignOut} type="button" className="btn text-white border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2]">Logout</button>
                    </> : <div>
                            <Link to="/login" className="btn mr-2 bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text border-[#9F62F2]">Login</Link>
                            <Link to="/register" className="btn text-base-100 border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2]">Register</Link>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;