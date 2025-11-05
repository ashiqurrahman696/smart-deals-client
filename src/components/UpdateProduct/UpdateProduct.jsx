import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { BiLeftArrowAlt } from "react-icons/bi";
import { toast } from "react-toastify";

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const product = useLoaderData();

    useEffect(() => {
        fetch('/category.json')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);
    const handleUpdateProduct = e => {
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
                const updatedProduct = {
                    title: title,
                    price_min: price_min,
                    price_max: price_max,
                    email: email,
                    category: category,
                    image: image,
                    location: location,
                    seller_name: seller_name,
                    seller_image: seller_image,
                    condition: condition,
                    usage: usage,
                    description: description,
                    seller_contact: seller_contact,
                };
                fetch(`http://localhost:3000/products/${product._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedProduct)
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.modifiedCount){
                            toast.success("Product updated successfully");
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
    }
    return (
        <div className="bg-neutral-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-4 items-center">
                <Link to="/all-products" className="flex items-center gap-3 text-center">
                    <BiLeftArrowAlt size={30} />
                    <span className="font-semibold text-lg">Back to Products</span>
                </Link>
                <h2 className="text-5xl text-center font-semibold">Update <span className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Product</span></h2>
                <div className="card bg-base-100 max-w-4xl w-full">
                    <div className="card-body">
                        <form onSubmit={handleUpdateProduct} className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold mb-1 label">Title</label>
                                <input type="text" defaultValue={product.title} name="title" className="input w-full" placeholder="Title" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Category</label>
                                <select name="category" className="select w-full">
                                    <option value="" selected disabled>Select a category</option>
                                    {categories.map(category => <option key={category._id} selected={category.slug === product.category} value={category.slug}>{category.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Min Price You want to Sale ($)</label>
                                <input type="text" defaultValue={product.price_min} name="price_min" className="input w-full" placeholder="Min Price" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Max Price You want to Sale ($)</label>
                                <input type="text" defaultValue={product.price_max} name="price_max" className="input w-full" placeholder="Max Price" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Product Condition</label>
                                <div className="flex gap-6">
                                    <div className="flex gap-2">
                                        <input type="radio" name="condition" defaultChecked={product.condition === "fresh"} className="radio radio-sm" id="fresh" value="fresh" />
                                        <label htmlFor="fresh">Brand New</label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="radio" name="condition" defaultChecked={product.condition === "used"} className="radio radio-sm" id="used" value="used" />
                                        <label htmlFor="used">Used</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Product Usage Time</label>
                                <input type="text" defaultValue={product.usage} name="usage" className="input w-full" placeholder="Product Usage Time" />
                            </div>
                            <div className="col-span-full">
                                <label className="font-semibold mb-1 label">Product Image URL</label>
                                <input type="text" defaultValue={product.image} name="image" className="input w-full" placeholder="Product Image URL" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Seller Name</label>
                                <input type="text" defaultValue={product.seller_name} name="seller_name" className="input w-full" placeholder="Seller Name" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Seller Email</label>
                                <input type="text" defaultValue={product.email} name="email" className="input w-full" placeholder="Seller Email" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Seller Contact</label>
                                <input type="text" defaultValue={product.seller_contact} name="seller_contact" className="input w-full" placeholder="Seller Contact" />
                            </div>
                            <div>
                                <label className="font-semibold mb-1 label">Seller Image URL</label>
                                <input type="text" defaultValue={product.seller_image} name="seller_image" className="input w-full" placeholder="Seller Image URL" />
                            </div>
                            <div className="col-span-full">
                                <label className="font-semibold mb-1 label">Location</label>
                                <input type="text" defaultValue={product.location} name="location" className="input w-full" placeholder="Location" />
                            </div>
                            <div className="col-span-full">
                                <label className="font-semibold mb-1 label">Simple Description about your Product</label>
                                <textarea name="description" defaultValue={product.description} className="textarea w-full" placeholder="Description"></textarea>
                            </div>
                            <button className="btn text-white border-0 bg-linear-to-br from-[#632EE3] to-[#9F62F2] col-span-full">Update Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;