import { useEffect, useState } from "react";
import Product from "../Product/Product";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/products")
            .then(data => setProducts(data.data));
    }, [axiosSecure]);
    return (
        <div className="bg-neutral-100 px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h2 className="text-4xl font-semibold text-center">All <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Products</span></h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        products.map((product => <Product key={product._id} product={product} />))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProducts;