import React from "react";
import { useDispatch } from "react-redux";
import { filterByPrice } from "../redux/productSlice";
import FilterCardDesktop from "./FilterCardDesktop";

const FilterSectionDesktop = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = React.useState(false);
  const [chechedField, setIsCheckhedField] = React.useState("");

  const handlePriceSort = (sortBy) => {
    setIsChecked(!isChecked);
    setIsCheckhedField(sortBy);
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

  const SortBy = () => (
    <div className="h-60 max-h-64 bg-white p-4 shadow-lg rounded-t-2xl">
      <div className=" ">
        <h3 className="mb-4 font-semibold text-gray-900">Sort by</h3>
        <ul className="w-full text-sm font-medium text-gray-900 bg-white  ">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className="w-full border-b border-gray-200 rounded-t-lg "
            >
              <div className="flex items-center">
                <input
                  id={option.value}
                  type="radio"
                  value={option.value}
                  name="sortList"
                  checked={chechedField === option.value}
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
  );

  return (
    <div className="flex flex-col gap-4">
      <SortBy />
      <FilterCardDesktop type="model" />
      <FilterCardDesktop type="brand" />
    </div>
  );
};

export default FilterSectionDesktop;
