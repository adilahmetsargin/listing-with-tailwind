import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";

/* eslint-disable react/prop-types */
const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const products = useSelector((state) => state.cartProducts.cartProducts);

  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products?.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const handleIncrementQuantity = (product) => {
    dispatch(incrementQuantity(product));
  };
  const handleDecrementQuantity = (product) => {
    dispatch(decrementQuantity(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  return (
    <>
      <div className="relative z-10" aria-labelledby="slide-over-title">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setIsCartOpen(!isCartOpen)}
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {products?.length !== 0 ? (
                            products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.img}
                                    alt="product-image"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{product.title}</a>
                                      </h3>
                                      <p className="ml-4">₺{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.desc?.slice(0, 15)}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center">
                                      <button
                                        className="bg-blue-700 text-white font-bold p-1 rounded mt-4"
                                        onClick={() =>
                                          handleDecrementQuantity(product)
                                        }
                                      >
                                        -
                                      </button>

                                      <p className="mt-4 px-2 text-black">
                                        {product.quantity}
                                      </p>

                                      <button
                                        className="bg-blue-700 text-white font-bold p-1 rounded mt-4"
                                        onClick={() =>
                                          handleIncrementQuantity(product)
                                        }
                                      >
                                        +
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                          handleRemoveFromCart(product)
                                        }
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          ) : (
                            <div className="flex justify-center h-screen mt-20">
                              <img
                                className="h-1/4"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAg7XqbzeZa9sjPUsYcQMcBHFbL6RYBs7f5SvtCDnbxhggQVDWWPyHMOXfFj1Nk8YTajU&usqp=CAU"
                                alt="empty-cart-logo"
                              />
                            </div>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {products?.length !== 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₺{totalPrice()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
