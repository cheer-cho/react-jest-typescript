import "./styles.css";
import { Bomb } from "types";
import BombPanel from "./components/BombPanel";

const randomNumberOfBombs = Math.floor(Math.random() * 4) + 2;

const mockedBombs: Bomb[] = [];
for (let index = 0; index < randomNumberOfBombs; index += 1) {
  mockedBombs.push({
    name: `Bomb ${String.fromCharCode(65 + index)}`,
    initialTime: Math.floor(Math.random() * 11) + 10,
  });
}

export default function App() {
  return <BombPanel allBombs={mockedBombs} />;
}
