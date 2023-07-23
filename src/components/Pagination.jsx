/* eslint-disable react/prop-types */
const Pagination = (props) => {
  return (
    <>
      <div className="flex">
        <button
          disabled={props.isPrevButtonDisable}
          onClick={() => props.goToPreviousPage()}
          className="flex items-center justify-center px-4 h-10 text-gray-500 bg-white disabled:bg-gray-300 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
        >
          Previous
        </button>

        <button
          disabled={props.isNextButtonDisable}
          onClick={() => props.goToNextPage()}
          className="flex items-center justify-center px-4 h-10 ml-3 text-gray-500 bg-white disabled:bg-gray-300 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
