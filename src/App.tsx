import { useState } from "react";
import Menu from "./components/Menu";
import VsCpu from "./components/VsCpu";
import VsPlayer from "./components/VsPlayer";

const App = () => {
  const [screen, setScreen] = useState<string>("menu");
  const [pickMark, setPickMark] = useState<"xMark" | "oMark">("oMark");

  return (
    <div className="text-preset-body bg-dark-navy min-h-screen flex flex-col items-center justify-center">
      {screen === "menu" && (
        <Menu
          pickMark={pickMark}
          setPickMark={setPickMark}
          onStart={setScreen}
        />
      )}
      {screen === "vscpu" && (
        <VsCpu pickMark={pickMark} setScreen={setScreen} />
      )}
      {screen === "vsplayer" && (
        <VsPlayer pickMark={pickMark} setScreen={setScreen} />
      )}
    </div>
  );
};
export default App;
