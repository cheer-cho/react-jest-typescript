import { useEffect } from "react";

import { Bomb } from "@/types";
import BombImage from "@/assets/images/bomb-60x60.png";
import ListItem from "@/components/shared/ListItem";
import { useActions, useTimer } from "@/contexts/BombContext";

type BombItemProps = {
  bomb: Bomb;
};

/**
 * BombItem Component
 *
 * render Bomb item
 *  */
const BombItem = ({ bomb: { initialTime, name } }: BombItemProps) => {
  const { timer } = useTimer();
  const { bombExploded } = useActions();
  useEffect(() => {
    if (timer === initialTime) {
      bombExploded();
    }
  }, [timer]);

  return (
    <ListItem>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={BombImage} alt={name} />
        <h2 style={{ marginLeft: "16px" }}>{name}</h2>
      </div>
      <div>
        <span data-testid="timer">
          {/* conditional render time left if time > 0 or Exploded if time === 0*/}
          {timer < initialTime ? (
            `${initialTime - timer} seconds`
          ) : (
            <span style={{ color: "red" }}>Exploded</span>
          )}
        </span>
      </div>
    </ListItem>
  );
};

export default BombItem;
