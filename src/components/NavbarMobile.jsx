/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileIcon from "../assets/ProfileIcon";
import SearchIcon from "../assets/SearchIcon";
import TotalPriceIcon from "../assets/TotalPriceIcon";
import { setSearchTerm } from "../redux/productSlice";
import Cart from "./Cart";

const NavbarMobile = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cartProducts.cartProducts);
  const searchTerm = useSelector((state) => state.products.searchTerm);

  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e));
  };

  const totalPrice = () => {
    let total = 0;
    products?.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  return (
    <>
      <header className="bg-[#2A59FE] text-white">
        <div className="container flex items-center px-4 justify-around md:justify-between h-14">
          <div
            className={`text-xl md:text-2xl mr-12 ${
              isSearchBarOpen ? "hidden" : "inital"
            }`}
          >
            <Link to="/">Eteration</Link>
          </div>

          <div>
            <div
              className={`items-center bg-white rounded-md px-4 w-[350px] h-10 ${
                isSearchBarOpen ? "flex" : "hidden"
              } `}
            >
              <input
                className="w-full border-none outline-none cursor-pointer bg-white text-black"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}>
                <SearchIcon bg="#000" />
              </div>
            </div>
            <div
              className={`flex gap-x-4  ${
                !isSearchBarOpen ? "flex" : "hidden"
              } `}
            >
              <div
                className={`flex flex-col items-center gap-y-1 `}
                onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
              >
                <SearchIcon bg="#fff" />
                <span className="text-[10px]">Search</span>
              </div>
              <div
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={`flex flex-col items-center gap-y-1 `}
              >
                <TotalPriceIcon />
                <span className="text-[10px]">₺{totalPrice()}</span>
              </div>
              <div className={`flex flex-col items-center gap-y-1 `}>
                <ProfileIcon />
                <span className="text-[10px]">User</span>
              </div>
            </div>
          </div>
        </div>
        {isCartOpen && (
          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        )}
      </header>
    </>
  );
};

export default NavbarMobile;
