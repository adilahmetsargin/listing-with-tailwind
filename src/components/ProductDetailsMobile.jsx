import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { fetchProductDetailById } from "../redux/productSlice";
import Spinner from "./Spinner";

const ProductDetailsDesktop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.products);
  const { statusForDetail } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProductDetailById(id));
  }, [dispatch, id]);

  if (statusForDetail === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <section className="text-gray-700  overflow-hidden bg-white h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={productDetail.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {productDetail.model}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {productDetail.name}
              </h1>

              <p className="leading-relaxed">
                {productDetail.description?.slice(0, 400)}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#2A59FE]">
                  ₺ {productDetail.price}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: productDetail.id,
                        title: productDetail.name,
                        desc: productDetail.description,
                        price: productDetail.price,
                        img: productDetail.image,
                        quantity: 1,
                      })
                    )
                  }
                  className="text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsDesktop;
