import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

/* eslint-disable react/prop-types */
const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="lg:w-1/4 md:w-1/2 sm:w-1/2 p-2 border-b-2 w-[170px]">
      <Link to={`/product/${item.id}`}>
        <a className="block relative max-h-48 rounded overflow-hidden">
          <img
            alt="product-image"
            className="object-cover object-center w-full h-full block"
            src={item.image}
          />
        </a>
        <div className="mt-4">
          <h2 className="text-gray-900 text-lg font-medium truncate">
            {item.name}
          </h2>
          <div className="flex flex-col">
            <p className="mt-1">₺{item.price}</p>

            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  addToCart({
                    id: item?.id,
                    title: item?.name,
                    desc: item?.description,
                    price: item?.price,
                    img: item?.image,
                    quantity: 1,
                  })
                );
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold p-1 rounded mt-4"
            >
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
