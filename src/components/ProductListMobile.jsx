import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import FilterSectionMobile from "./FilterSectionMobile";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const ProductListMobile = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.productList);
  const filters = useSelector((state) => state.products.filters);
  const status = useSelector((state) => state.products.status);

  const searchTerm = useSelector((state) => state.products.searchTerm);

  const getFilteredProducts = () => {
    const filteredProducts = productList
      ?.filter((product) => {
        const isBrandSelected =
          filters.brand.length === 0 || filters.brand.includes(product.brand);
        const isModelSelected =
          filters.model.length === 0 || filters.model.includes(product.model);
        return isBrandSelected && isModelSelected;
      })
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return filteredProducts;
  };

  const data = getFilteredProducts();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // For Manuel Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productsPerPage] = React.useState(12);
  const [isNextButtonDisable, setIsNextButtonDisable] = React.useState(false);
  const [isPrevButtonDisable, setIsPrevButtonDisable] = React.useState(false);

  React.useEffect(() => {
    setIsPrevButtonDisable(currentPage === 1 ? true : false);
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setIsNextButtonDisable(false);
  };

  const goToNextPage = () => {
    const lastPage = Math.ceil(data.length / productsPerPage);
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === lastPage - 1) {
      setIsNextButtonDisable(true);
    }
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <FilterSectionMobile />
      <div className="flex flex-col mb-2">
        <section className={`text-gray-600 ${!currentProducts && "hidden"}`}>
          <div className="container px-5 py-24 mx-auto shadow-md">
            <div className="flex flex-wrap -m-4 divide-x-2 justify-center">
              {currentProducts?.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {status !== "loading" && (
          <div className="flex items-center justify-center mt-2">
            <Pagination
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
              isNextButtonDisable={isNextButtonDisable}
              isPrevButtonDisable={isPrevButtonDisable}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListMobile;
