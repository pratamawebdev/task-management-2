const SelectButton = (props) => {
  const { children, id, onChange, value, ariaLabel } = props;
  return (
    <select
      className="inline-block w-40 px-4 py-2 overflow-hidden text-sm font-medium text-white no-underline capitalize border-none rounded-md cursor-pointer bg-slate-600"
      id={id}
      onChange={onChange}
      value={value}
      aria-label={ariaLabel}
    >
      {children}
    </select>
  );
};

export default SelectButton;
