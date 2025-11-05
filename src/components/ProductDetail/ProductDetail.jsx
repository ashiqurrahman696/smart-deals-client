import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { BiLeftArrowAlt } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductDetail = () => {
    const {user} = useAuth();
    const [bids, setBids] = useState([]);
    const product = useLoaderData();
    const bidModalRef = useRef(null);
    const axiosSecure = useAxiosSecure()
    const {_id, title, description, category, price_min, price_max, image, condition, usage, seller_image, seller_name, email, location, seller_contact, status, created_at} = product;

    useEffect(() => {
        axiosSecure.get(`/products/bids/${_id}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        }).then(data => {
                setBids(data.data);
            })
    }, [_id, user]);

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    const handleBidSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.value;
        const price = form.price.value;
        const contact = form.contact.value;
        const newBid = {
            product: _id,
            buyer_name: name,
            buyer_email: email,
            buyer_image: image,
            bid_price: parseInt(price),
            buyer_contact: contact,
            status: "pending"
        };
        axiosSecure.post("/bids", {
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    bidModalRef.current.close();
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];
                    newBids.sort((a, b) => b.bid_price - a.bid_price);
                    setBids(newBids);
                    Swal.fire({
                        icon: "success",
                        title: "Congratulations!",
                        text: "Your bid has been placed!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div className="bg-neutral-100 px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-5">
                        <img src={image} alt={title} className="rounded-xl w-full" />
                        <div className="card bg-base-100 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">{title}</h2>
                                <div className="font-semibold flex justify-between gap-5 flex-wrap pb-3 border-b">
                                    <p><span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Condition:</span> {condition}</p>
                                    <p><span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Usage Time:</span> {usage}</p>
                                </div>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <Link to="/all-products" className="flex items-center gap-3">
                            <BiLeftArrowAlt size={30} />
                            <span className="font-semibold text-lg">Back to Products</span>
                        </Link>
                        <h2 className="font-bold text-4xl">{title}</h2>
                        <div className="badge bg-[#E0D8F3]">
                            <span className="text-[#632EE3]">{category}</span>
                        </div>
                        <div className="card bg-base-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title text-[#4caf50]">${price_min} - {price_max}</h3>
                                <p>Price starts from</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Product Details</h3>
                                <p><strong>Product ID:</strong> {_id}</p>
                                <p><strong>Posted:</strong> {new Date(created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Seller Information</h3>
                                <div className="flex items-center gap-3">
                                    <img src={seller_image} alt={seller_name} className="size-10 rounded-full" />
                                    <div>
                                        <p className="text-lg font-semibold">{seller_name}</p>
                                        <p>{email}</p>
                                    </div>
                                </div>
                                <p><strong>Location:</strong> {location}</p>
                                <p><strong>Contact:</strong> {seller_contact}</p>
                                <p className="flex items-center gap-2">
                                    <strong>Status:</strong>
                                    {status === "pending" ? <span className="badge badge-warning">pending</span> : <span className="badge badge-success">sold</span>}
                                </p>
                            </div>
                        </div>
                        <button onClick={handleBidModalOpen} className="btn btn-block text-base-100 border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2]">I want this product</button>
                    </div>
                </div>
                <dialog ref={bidModalRef} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">Give Seller Your Offered Price</h3>
                        <form onSubmit={handleBidSubmit}>
                            <fieldset className="fieldset">
                                <label className="label">Buyer Name</label>
                                <input type="text" name="name" defaultValue={user.displayName} className="input w-full" placeholder="Buyer Name" />
                                <label className="label">Buyer Email</label>
                                <input type="text" name="email" defaultValue={user.email} className="input w-full" placeholder="Buyer Email" />
                                <label className="label">Buyer Image URL</label>
                                <input type="text" name="image" defaultValue={user.photoURL} className="input w-full" placeholder="Buyer Image URL" />
                                <label className="label">Place Your Price</label>
                                <input type="text" name="price" className="input w-full" placeholder="Place Your Price" />
                                <label className="label">Contact Info</label>
                                <input type="text" name="contact" className="input w-full" placeholder="Contact Info" />
                                <button className="btn text-base-100 border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2] mt-4">Submit Bid</button>
                            </fieldset>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <h3 className="text-3xl font-semibold">Bids for this product: <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">{bids.length}</span></h3>
                <div className="overflow-x-auto bg-base-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>SL No.</th>
                                <th>Product</th>
                                <th>Buyer</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids.length === 0 ? <tr>
                                <td colSpan={5} className="text-center">No bids in this product</td>
                            </tr> : bids.map((bid, index) =>
                            <tr key={bid._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="h-12 w-12">
                                                <img
                                                    src={image}
                                                    alt={title} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{title}</div>
                                            <div className="text-sm opacity-50">${price_max}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="rounded-full h-12 w-12">
                                                <img
                                                    src={bid.buyer_image}
                                                    alt={bid.buyer_name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.buyer_name}</div>
                                            <div className="text-sm opacity-50">{bid.buyer_email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${bid.bid_price}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;