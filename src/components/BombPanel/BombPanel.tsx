import { useCallback, useState } from "react";
import { Bomb } from "types";
import BombList from "./BombList";
import Button from "../shared/Button";

type BombPanelProps = {
  allBombs: Bomb[];
};

const BombPanel = ({ allBombs }: BombPanelProps) => {
  const [bombs, _] = useState<Bomb[]>(allBombs);
  const [isStartTimer, setIsStartTimer] = useState<boolean>(false);
  const [explodedCount, setExplodedCount] = useState<number>(0);
  const isDisabled = isStartTimer && explodedCount < bombs.length;
  const isAllBombExploded = isStartTimer && explodedCount === bombs.length;

  const handleTriggleBomb = useCallback(() => {
    if (isDisabled) {
      return;
    }
    setIsStartTimer(true);
  }, []);

  const handleBombExploded = useCallback(() => {
    setExplodedCount((prevCount) => prevCount + 1);
  }, []);

  let buttonLabel = "Explode";
  if (isStartTimer) {
    buttonLabel = "Waiting to explode...";
  }
  if (isAllBombExploded) {
    buttonLabel = "All bombs exploded";
  }

  return (
    <div
      style={{
        paddingTop: "16px",
        paddingBottom: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BombList
        bombList={bombs}
        isStartTimer={isStartTimer}
        onBombExploded={handleBombExploded}
      />
      <Button
        color={`${isAllBombExploded ? "error" : "primary"}`}
        disabled={isDisabled}
        onClick={handleTriggleBomb}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default BombPanel;
