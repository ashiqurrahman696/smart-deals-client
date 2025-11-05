import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
    const {user} = useAuth();
    const [bids, setBids] = useState([]);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if(user?.email){
            axiosSecure.get(`/bids?email=${user.email}`)
                .then(data => setBids(data.data));
        }
    }, [user, axiosSecure]);

    const handleRemoveBid = (_id) => {
        Swal.fire({
            title: "Are you sure to remove?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if(result.isConfirmed){
                fetch(`http://localhost:3000/bids/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.deletedCount){
                            Swal.fire({
                                title: "Bid removed!",
                                text: "Your bid has been removed.",
                                icon: "success"
                            });
                            const remainingBids = bids.filter(bid => bid._id !== _id);
                            setBids(remainingBids);
                        }
                    });
            }
        });
    }
    return (
        <div className="bg-neutral-100 px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h3 className="text-3xl font-semibold text-center">My Bids: <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">{bids.length}</span></h3>
                <div className="overflow-x-auto bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL No.</th>
                                <th>Buyer</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids.map((bid, index) => <tr key={bid._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="rounded-full h-12 w-12">
                                                <img
                                                    src={bid.buyer_image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.buyer_name}</div>
                                            <div className="text-sm opacity-50">{bid.buyer_email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{bid.buyer_email}</td>
                                <td>${bid.bid_price}</td>
                                <td>
                                    <div className="badge badge-warning">{bid.status}</div>
                                </td>
                                <th>
                                    <button onClick={()=>handleRemoveBid(bid._id)} className="btn btn-outline btn-error btn-xs">Remove Bid</button>
                                </th>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBids;