const Button = (props) => {
  const { type, classname, children, onClick } = props;

  return (
    <button
      type={type}
      className={`inline-block h-auto py-2 border-none no-underline capitalize rounded-md font-medium text-sm cursor-pointer overflow-hidden px-4 ${classname}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
