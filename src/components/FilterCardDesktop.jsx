/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "../assets/SearchIcon";
import { removeFilter, addFilter } from "../redux/productSlice";

const FilterCardDesktop = ({ type }) => {
  const dispatch = useDispatch();

  // Brands
  const brands = useSelector((state) => state.products.brands);
  const [searchTermForBrands, setSearchTermForBrands] = React.useState("");
  const handleSearchForBrands = (event) => {
    setSearchTermForBrands(event.target.value);
  };

  // Models
  const models = useSelector((state) => state.products.models);
  const [searchTermForModels, setSearchTermForModels] = React.useState("");
  const handleSearchForModels = (event) => {
    setSearchTermForModels(event.target.value);
  };

  // SelectedModelsAndBrands
  const filters = useSelector((state) => state.products.filters);

  const handleFilterChange = (filterType, filterValue) => {
    if (filters[filterType].includes(filterValue)) {
      dispatch(removeFilter({ filterType, filterValue }));
    } else {
      dispatch(addFilter({ filterType, filterValue }));
    }
  };
  return (
    <>
      <div className="  bg-white rounded-lg shadow w-60 dark:bg-gray-700">
        <div className="p-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon bg="#000" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Search ${type === "model" ? "model" : "brand"}`}
              value={
                type === "model" ? searchTermForModels : searchTermForBrands
              }
              onChange={
                type === "model" ? handleSearchForModels : handleSearchForBrands
              }
            />
          </div>
        </div>
        <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
          {type === "model"
            ? models
                .filter((model) =>
                  model
                    .toLowerCase()
                    .includes(searchTermForModels.toLowerCase())
                )
                ?.map((model) => (
                  <li
                    key={model}
                    className="w-full border-b border-gray-200 rounded-t-lg "
                  >
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                      <input
                        type="checkbox"
                        value={model}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                        checked={filters.model.includes(model)}
                        onChange={() => handleFilterChange("model", model)}
                      />
                      <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded ">
                        {model}
                      </label>
                    </div>
                  </li>
                ))
            : brands
                .filter((brand) =>
                  brand
                    .toLowerCase()
                    .includes(searchTermForBrands.toLowerCase())
                )
                ?.map((brand) => (
                  <li
                    key={brand}
                    className="w-full border-b border-gray-200 rounded-t-lg "
                  >
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                      <input
                        type="checkbox"
                        value={brand}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                        checked={filters.brand.includes(brand)}
                        onChange={() => handleFilterChange("brand", brand)}
                      />
                      <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded ">
                        {brand}
                      </label>
                    </div>
                  </li>
                ))}
        </ul>
      </div>
    </>
  );
};

export default FilterCardDesktop;
