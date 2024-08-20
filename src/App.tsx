import "./styles.css";
import { Bomb } from "@/types";
import BombPanel from "@/components/BombPanel";
import { BombProvider, initState } from "@/contexts/BombContext";

const randomNumberOfBombs = Math.floor(Math.random() * 7) + 4;

const mockedBombs: Bomb[] = [];
for (let index = 0; index < randomNumberOfBombs; index += 1) {
  mockedBombs.push({
    name: `Bomb ${String.fromCharCode(65 + index)}`,
    initialTime: Math.floor(Math.random() * 11) + 10,
  });
}

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <BombProvider
        bombs={mockedBombs}
        explodedCount={initState.explodedCount}
        isStartTimer={initState.isStartTimer}
        timer={initState.timer}
      >
        <BombPanel />
      </BombProvider>
    </div>
  );
}
