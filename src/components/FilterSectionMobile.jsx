import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterIcon from "../assets/FilterIcon";
import SearchIcon from "../assets/SearchIcon";
import SortIcon from "../assets/SortIcon";
import {
  // filterByBrand,
  filterByPrice,
  removeFilter,
  addFilter,
} from "../redux/productSlice";

const FilterSectionMobile = () => {
  const dispatch = useDispatch();
  const [isSortOpen, setIsSortOpen] = React.useState(false);

  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState("Models");

  const [isCheckedForSort, setIsCheckedForSort] = React.useState(false);
  const [chechedFieldForSort, setIsCheckhedFieldForSort] = React.useState("");

  const toggleSortSheet = () => {
    setIsSortOpen(!isSortOpen);
  };

  const toggleFiltersSheet = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handlePriceSort = (sortBy) => {
    setIsCheckedForSort(!isCheckedForSort);
    setIsCheckhedFieldForSort(sortBy);
    dispatch(filterByPrice({ sortBy }));
  };

  const sortOptions = [
    {
      id: "oldToNew",
      value: "oldToNew",
      sortField: "oldToNew",
      displayName: "Old to new",
    },
    {
      id: "newToOld",
      value: "newToOld",
      sortField: "newToOld",
      displayName: "New to old",
    },
    {
      id: "highToLow",
      value: "highToLow",
      sortField: "highToLow",
      displayName: " High to low",
    },
    {
      id: "lowToHigh",
      value: "lowToHigh",
      sortField: "lowToHigh",
      displayName: "Low to high",
    },
  ];

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
      <div className="w-full flex h-12 divide-x-2 divide-zinc-300 border-b-2 border-b-zinc-300 text-zinc-600 shadow-sm">
        <div
          onClick={toggleFiltersSheet}
          className="flex flex-1 items-center justify-center gap-x-2"
        >
          <FilterIcon />
          <span>Filter</span>
        </div>

        <div
          onClick={toggleSortSheet}
          className="flex flex-1 items-center justify-center gap-x-2"
        >
          <SortIcon />
          <span>Sort</span>
        </div>
      </div>

      {/* TopSheet */}
      {isSortOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 998,
            }}
            onClick={toggleSortSheet}
          />
          <div className="fixed bottom-0 w-screen h-auto bg-white p-4 shadow-2xl  z-[999999] rounded-t-2xl">
            <div className=" ">
              <h3 className="mb-4 font-semibold text-gray-900">Sort by</h3>
              <ul className="w-full text-sm font-medium text-gray-900 bg-white  ">
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    className="w-full border-b border-gray-200 rounded-t-lg "
                  >
                    <div className="flex items-center pl-3">
                      <input
                        id={option.value}
                        type="radio"
                        value={option.value}
                        name="list-radio"
                        checked={chechedFieldForSort === option.value}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                        onChange={() => handlePriceSort(option.sortField)}
                      />
                      <label
                        htmlFor={option.value}
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
                      >
                        {option.displayName}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* BottomSheet */}
      {isFiltersOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 998,
            }}
            onClick={toggleFiltersSheet}
          />
          <div className="fixed top-0 right-0 w-screen h-2/4 bg-white p-4 shadow-lg z-[999999] overflow-y-scroll">
            <div className=" ">
              <div className="flex w-full gap-x-6 items-center justify-evenly">
                <h3
                  className={`font-semibold text-gray-900 cursor-pointer  ${
                    selectedSection === "Models"
                      ? "border-b-2 border-blue-500"
                      : "border-none"
                  } `}
                  onClick={() => setSelectedSection("Models")}
                >
                  Models
                </h3>
                <h3
                  className={`font-semibold text-gray-900  cursor-pointer ${
                    selectedSection === "Brands"
                      ? "border-b-2 border-blue-500"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedSection("Brands")}
                >
                  Brands
                </h3>
              </div>
              <div className="relative mt-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon bg="#000" />
                </div>
                <input
                  type="text"
                  value={
                    selectedSection === "Models"
                      ? searchTermForModels
                      : searchTermForBrands
                  }
                  onChange={
                    selectedSection === "Models"
                      ? handleSearchForModels
                      : handleSearchForBrands
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                  placeholder={`Search ${
                    selectedSection === "Models" ? "model" : "brand"
                  }`}
                />
              </div>
              <ul className="h-screen pb-3 mt-3  text-sm text-gray-700">
                {selectedSection === "Models"
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
                              id={model}
                              type="checkbox"
                              value={model}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                              checked={filters.model.includes(model)}
                              name="list-radio"
                              onChange={() =>
                                handleFilterChange("model", model)
                              }
                            />
                            <label
                              htmlFor={model}
                              className="w-full ml-2 text-sm font-medium text-gray-900 rounded "
                            >
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
                              id={brand}
                              type="checkbox"
                              value={brand}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
                              checked={filters.brand.includes(brand)}
                              onChange={() =>
                                handleFilterChange("brand", brand)
                              }
                            />
                            <label
                              htmlFor={brand}
                              className="w-full ml-2 text-sm font-medium text-gray-900 rounded "
                            >
                              {brand}
                            </label>
                          </div>
                        </li>
                      ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterSectionMobile;
