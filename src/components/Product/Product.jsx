import { Link } from "react-router";

const Product = ({product}) => {
    const {_id, title, price_min, price_max, image} = product;
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="px-4 pt-4">
                <img
                    src={image}
                    alt={title}
                    className="rounded-xl" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{title}</h2>
                <p className="font-semibold bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">$ {price_min}-{price_max}</p>
                <div className="card-actions">
                    <Link to={`/product-detail/${_id}`} className="btn btn-block bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text border-[#9F62F2]">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;