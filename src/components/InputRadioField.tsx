interface InputRadioFieldProps {
  pickMark: "xMark" | "oMark";
  setPickMark: React.Dispatch<React.SetStateAction<"xMark" | "oMark">>;
}

const InputRadioField = ({ pickMark, setPickMark }: InputRadioFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value === "xMark" || value === "oMark") setPickMark(value);
  };

  return (
    <fieldset className="w-82 h-51 flex flex-col items-center justify-around py-4 bg-semi-dark-navy rounded-2xl">
      <legend className="sr-only">PICK PLAYER 1'S MARK</legend>
      <span className="text-preset-heading-sxs">PICK PLAYER 1'S MARK</span>
      <div className="flex items-center justify-center w-70 h-18 bg-dark-navy rounded-[0.625rem]">
        <label className="w-33 h-13.5 flex items-center justify-center rounded-[0.625rem] has-[:checked]:bg-light-silver hover:bg-[#A8BFC9]/5 hover:cursor-pointer">
          <input
            type="radio"
            name="mark"
            id="xMark"
            value={"xMark"}
            onChange={handleChange}
            checked={pickMark === "xMark"}
            className="peer sr-only"
          />
          <svg
            width="64"
            height="64"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="fill-light-silver  w-8 h-8 peer-checked:fill-dark-navy "
          >
            <path
              d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
              fillRule="evenodd"
            />
          </svg>
        </label>

        <label className="w-33 h-13.5 flex items-center justify-center rounded-[0.625rem] has-[:checked]:bg-light-silver hover:bg-[#A8BFC9]/5 hover:cursor-pointer">
          <input
            type="radio"
            name="mark"
            id="oMark"
            value={"oMark"}
            onChange={handleChange}
            checked={pickMark === "oMark"}
            className="peer sr-only"
          />
          <svg
            width="64"
            height="64"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="fill-light-silver w-8 h-8 peer-checked:fill-dark-navy"
          >
            <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
          </svg>
        </label>
      </div>
      <span>REMEMBER : X GOES FIRST</span>
    </fieldset>
  );
};
export default InputRadioField;
