import { Bomb } from "types";
import BombItem from "./BombItem";
import React from "react";

type BombList = {
  bombList: Bomb[];
  isStartTimer: boolean;
  onBombExploded: () => void;
};

const BombList = ({
  bombList,
  isStartTimer,
  onBombExploded: handleBombExploded,
}: BombList) => {
  return (
    <ul aria-label="list of bomb" style={{ listStyle: "none" }}>
      {bombList.map((bomb) => (
        <li key={bomb.name} style={{ marginBottom: "16px" }}>
          <BombItem
            bomb={bomb}
            isStartCountDown={isStartTimer}
            onBombExploded={handleBombExploded}
          />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(BombList);
