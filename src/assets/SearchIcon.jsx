/* eslint-disable react/prop-types */
function SearchIcon(props) {
  const { bg } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={bg}
        fillRule="evenodd"
        d="M15 10a5 5 0 11-10 0 5 5 0 0110 0zm-1.406 6.008a7 7 0 111.559-1.27l4.054 4.055a1 1 0 01-1.414 1.414l-4.199-4.199z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#2A59FE"
        fillOpacity="0.3"
        fillRule="evenodd"
        d="M15 10a5 5 0 11-10 0 5 5 0 0110 0zm-1.406 6.008a7 7 0 111.559-1.27l4.054 4.055a1 1 0 01-1.414 1.414l-4.199-4.199z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#fff"
        fillOpacity="0.5"
        fillRule="evenodd"
        d="M15 10a5 5 0 11-10 0 5 5 0 0110 0zm-1.406 6.008a7 7 0 111.559-1.27l4.054 4.055a1 1 0 01-1.414 1.414l-4.199-4.199z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default SearchIcon;
