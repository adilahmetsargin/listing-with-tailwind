/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileIcon from "../assets/ProfileIcon";
import SearchIcon from "../assets/SearchIcon";
import TotalPriceIcon from "../assets/TotalPriceIcon";
import { setSearchTerm } from "../redux/productSlice";
import Cart from "./Cart";

const NavbarDesktop = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cartProducts.cartProducts);
  const searchTerm = useSelector((state) => state.products.searchTerm);

  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(true);
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

          <div className="flex items-center min-w-fit w-5/12 h-10 bg-white rounded-md px-2">
            <SearchIcon bg="#000" />
            <input
              placeholder="Search"
              type="search"
              className="w-full border-none outline-none cursor-pointer bg-white text-black ml-2"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-6">
            <div
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="flex items-center gap-2"
            >
              <TotalPriceIcon />
              <span>₺{totalPrice()}</span>
            </div>
            <div className="flex items-center gap-2">
              <ProfileIcon />
              <span>Username</span>
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

export default NavbarDesktop;
