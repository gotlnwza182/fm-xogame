interface ButtonsProps {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  bgColor: string;
  value?: string;
  onStart: React.Dispatch<React.SetStateAction<string>>;
}

const Buttons = ({
  text,
  type = "button",
  bgColor,
  value,
  onStart,
}: ButtonsProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    onStart(value);
  };
  return (
    <button
      type={type}
      value={value}
      onClick={handleClick}
      className={`w-pick-area h-14 rounded-2xl text-preset-heading-sxs text-dark-navy hover:brightness-110 hover:cursor-pointer ${bgColor} ${
        bgColor === "bg-light-yellow"
          ? "inset-shadow-[0_-8px_0_0_rgba(204,139,19,1)]"
          : "inset-shadow-[0_-8px_0_0_rgba(17,140,135,1)]"
      } `}
    >
      {text}
    </button>
  );
};
export default Buttons;
