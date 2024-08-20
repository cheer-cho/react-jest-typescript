import { Bomb } from "types";
import BombImage from "../../../../assets/images/bomb-60x60.png";
import { useEffect, useState } from "react";
import ListItem from "../../../shared/ListItem";

type BombItemProps = {
  bomb: Bomb;
  isStartCountDown: boolean;
  onBombExploded: () => void;
};

const BombItem = ({
  bomb: { initialTime, name },
  isStartCountDown,
  onBombExploded: handleBombExploded,
}: BombItemProps) => {
  // create local state to track the timer
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  // time countdown start when isStartCountDown = true
  useEffect(() => {
    if (isStartCountDown) {
      // set interval and calculate time left
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // when reach 0 clear the interval (prevent memory leak)
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // if component is unmouted (before the timer reach 0)
      // cleanup interval prevent memory leak
      return () => clearInterval(intervalId);
    }
  }, [isStartCountDown]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleBombExploded();
    }
  }, [timeLeft]);

  return (
    <ListItem>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={BombImage} alt={name} />
        <h2 style={{ marginLeft: "16px" }}>{name}</h2>
      </div>
      <div>
        <span>
          {/* conditional render time left if time > 0 or Exploded if time === 0*/}
          {timeLeft > 0 ? (
            `${timeLeft} seconds`
          ) : (
            <span style={{ color: "red" }}>Exploded</span>
          )}
        </span>
      </div>
    </ListItem>
  );
};

export default BombItem;
