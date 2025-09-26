import Buttons from "./Buttons";
import InputRadioField from "./InputRadioField";

interface MenuProps {
  pickMark: "xMark" | "oMark";
  setPickMark: React.Dispatch<React.SetStateAction<"xMark" | "oMark">>;
  onStart: React.Dispatch<React.SetStateAction<string>>;
}

const Menu = ({ pickMark, setPickMark, onStart }: MenuProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 ">
      <img src="/assets/logo.svg" alt="logo" className="w-18 h-8" />
      <div className="text-light-silver">
        <InputRadioField pickMark={pickMark} setPickMark={setPickMark} />
      </div>
      <div className="flex flex-col gap-4">
        <Buttons
          text="NEW GAME (VS CPU)"
          bgColor="bg-light-yellow"
          value="vscpu"
          onStart={onStart}
        />
        <Buttons
          text="NEW GAME (VS PLAYER)"
          bgColor="bg-light-blue"
          value="vsplayer"
          onStart={onStart}
        />
      </div>
    </div>
  );
};
export default Menu;
