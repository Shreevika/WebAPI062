export const FormInput = ({ label, ...rest }) => (
  <div className="flex flex-col gap-2">
    {label && <label>{label}</label>}
    <input
      className="ring-1 ring-gray-300 rounded-md p-2 placeholder:italic focus:outline-none focus:ring-2 focus:ring-black"
      {...rest}
    />
  </div>
);
