import Game from "./Game";

interface VsCpuProps {
  pickMark: "xMark" | "oMark";
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}

const VsCpu = ({ pickMark, setScreen }: VsCpuProps) => {
  return <Game pickMark={pickMark} setScreen={setScreen} />;
};
export default VsCpu;
