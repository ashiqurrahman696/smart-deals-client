import { Suspense } from "react";
import LatestProducts from "../LatestProducts/LatestProducts";
import Banner from "../Banner/Banner";

const latestProductsPromise = fetch("https://smart-deals-server-beryl.vercel.app/latest-products").then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner/>
            <Suspense fallback={<p>Loading...</p>}>
                <LatestProducts latestProductsPromise={latestProductsPromise} />
            </Suspense>
        </div>
    );
};

export default Home;