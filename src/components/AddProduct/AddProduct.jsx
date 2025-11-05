import { BiLeftArrowAlt } from "react-icons/bi";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddProduct = () => {
    const {user} = useAuth();
    const categories = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const handleCreateProduct = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const price_min = form.price_min.value;
        const price_max = form.price_max.value;
        const condition = form.condition.value;
        const usage = form.usage.value;
        const image = form.image.value;
        const seller_name = form.seller_name.value;
        const email = form.email.value;
        const seller_contact = form.seller_contact.value;
        const seller_image = form.seller_image.value;
        const location = form.location.value;
        const description = form.description.value;
        const newProduct = {
            title: title,
            price_min: price_min,
            price_max: price_max,
            email: email,
            category: category,
            created_at: new Date(),
            image: image,
            status: "pending",
            location: location,
            seller_name: seller_name,
            seller_image: seller_image,
            condition: condition,
            usage: usage,
            description: description,
            seller_contact: seller_contact,
        };
        axiosSecure.post("/products", newProduct)
            .then(data => {
                console.log(data);
                if(data.data.insertedId){
                    form.reset();
                    Swal.fire({
                        icon: "success",
                        title: "Congratulations!",
                        text: "Your product has been created!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="bg-neutral-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-4 items-center">
                <Link to="/all-products" className="flex items-center gap-3 text-center">
                    <BiLeftArrowAlt size={30} />
                    <span className="font-semibold text-lg">Back to Products</span>
                </Link>
                <h2 className="text-5xl text-center font-semibold">Create <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">A Product</span></h2>
                <div className="card bg-base-100 max-w-4xl w-full">
                    <div className="card-body">
                        <form onSubmit={handleCreateProduct} className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold mb-1 label">Title</label>
                                <input type="text" name="title" className="input w-full" placeholder="Title" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Category</label>
                                <select name="category" className="select w-full">
                                    <option value="" selected disabled>Select a category</option>
                                    {categories.map(category => <option key={category._id} value={category.slug}>{category.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Min Price You want to Sale ($)</label>
                                <input type="text" name="price_min" className="input w-full" placeholder="Min Price" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Max Price You want to Sale ($)</label>
                                <input type="text" name="price_max" className="input w-full" placeholder="Max Price" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Product Condition</label>
                                <div className="flex gap-6">
                                    <div className="flex gap-2">
                                        <input type="radio" name="condition" className="radio radio-sm" id="fresh" value="fresh" defaultChecked />
                                        <label htmlFor="fresh">Brand New</label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="radio" name="condition" className="radio radio-sm" id="used" value="used" />
                                        <label htmlFor="used">Used</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Product Usage Time</label>
                                <input type="text" name="usage" className="input w-full" placeholder="Product Usage Time" />
                            </div>
                            <div className="col-span-full">
                                <label className="font-semibold mb-1 label">Product Image URL</label>
                                <input type="text" name="image" className="input w-full" placeholder="Product Image URL" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Seller Name</label>
                                <input type="text" defaultValue={user?.displayName} name="seller_name" className="input w-full" placeholder="Seller Name" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Seller Email</label>
                                <input type="text" defaultValue={user?.email} name="email" className="input w-full" placeholder="Seller Email" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Seller Contact</label>
                                <input type="text" name="seller_contact" className="input w-full" placeholder="Seller Contact" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Seller Image URL</label>
                                <input type="text" defaultValue={user?.photoURL} name="seller_image" className="input w-full" placeholder="Seller Image URL" />
                            </div>
                            <div className="col-span-full">
                                <label className="font-semibold mb-1 label">Location</label>
                                <input type="text" name="location" className="input w-full" placeholder="Location" />
                            </div>
                            <div className="col-span-full">
                                <label className="font-semibold mb-1 label">Simple Description about your Product</label>
                                <textarea name="description" className="textarea w-full" placeholder="Description"></textarea>
                            </div>
                            <button className="btn text-white border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2] col-span-full">Create A Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;