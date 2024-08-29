export const Button = ({ title, isLoading, ...rest }) => (
  <button
    className="bg-black text-white font-semibold p-2 rounded-md hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
    {...rest}
  >
    {isLoading ? "Please wait..." : title}
  </button>
);
