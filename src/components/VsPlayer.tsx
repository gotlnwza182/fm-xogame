import GamePlayer from "./GamePlayer";

interface VsCpuProps {
  pickMark: "xMark" | "oMark";
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}

const VsPlayer = ({ pickMark, setScreen }: VsCpuProps) => {
  return <GamePlayer pickMark={pickMark} setScreen={setScreen} />;
};
export default VsPlayer;
