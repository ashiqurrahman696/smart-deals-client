import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProducts = () => {
    const {user} = useAuth();
    const [products, setProducts] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if(user?.email){
            axiosSecure.get(`/products?email=${user.email}`)
                .then(data => setProducts(data.data));
        }
    }, [user?.email, axiosSecure]);

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure to remove?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "dodgerblue",
            cancelButtonColor: "crimson",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if(result.isConfirmed){
                fetch(`http://localhost:3000/products/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.deletedCount){
                            Swal.fire({
                                title: "Product removed!",
                                text: "Your product has been removed.",
                                icon: "success"
                            });
                            const remainingProducts = products.filter(bid => bid._id !== id);
                            setProducts(remainingProducts);
                        }
                    });
            }
        });
    }

    const handleMakeSold = (id) => {
        fetch(`http://localhost:3000/products/make-sold/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount){
                    toast.success("Product sold");
                }
                else{
                    toast.warn("Already sold")
                }
            });
    }
    return (
        <div className="bg-neutral-100 px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h3 className="text-3xl font-semibold text-center">My Products: <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">{products.length}</span></h3>
                <div className="overflow-x-auto bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL No.</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={product.image} alt={product.title} className="w-12" />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.category}</td>
                                <td>{product.price_min}</td>
                                <td>{product.status}</td>
                                <td className="flex gap-2 flex-wrap">
                                    <Link to={`/update/${product._id}`} className="btn btn-outline btn-primary btn-xs">Edit</Link>
                                    <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-outline btn-error btn-xs">Delete</button>
                                    <button onClick={() => handleMakeSold(product._id)} className="btn btn-outline btn-success btn-xs">Make Sold</button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyProducts;