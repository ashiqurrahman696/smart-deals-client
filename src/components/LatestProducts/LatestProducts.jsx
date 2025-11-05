import { use } from "react";
import Product from "../Product/Product";
import { Link } from "react-router";

const LatestProducts = ({latestProductsPromise}) => {
    const products = use(latestProductsPromise);
    return (
        <div className="bg-neutral-100 px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h2 className="text-center text-4xl font-semibold">Recent <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Products</span></h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        products.map((product => <Product key={product._id} product={product} />))
                    }
                </div>
                <div className="text-center">
                    <Link to="/all-products" className="btn text-base-100 border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2]">Show All</Link>
                </div>
            </div>
        </div>
    );
};

export default LatestProducts;