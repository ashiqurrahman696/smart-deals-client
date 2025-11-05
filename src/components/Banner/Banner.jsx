import { IoSearch } from "react-icons/io5";
import { Link } from "react-router";

const Banner = () => {
    return (
        <div className="bg-linear-to-br from-[#ffe6fd] to-[#e0f8f5] px-4 py-6 gap-4 flex items-center justify-center flex-col">
            <h1 className="font-bold text-7xl text-center w-[690px] max-w-full">Deal Your <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Products</span> In A <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Smart</span> Way!</h1>
            <p className="text-center">SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
            <div className="join w-full justify-center">
                <input className="input join-item rounded-l-full w-125" placeholder="Search for products, Categories" />
                <button className="btn text-white border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2] join-item rounded-r-full"><IoSearch /></button>
            </div>
            <div className="flex gap-4">
                <Link to="/all-products" className="btn text-base-100 border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2]">Watch All Products</Link>
                <Link to="/add-product" className="btn mr-2 bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text border-[#9F62F2]">Post a Product</Link>
            </div>
        </div>
    );
};

export default Banner;