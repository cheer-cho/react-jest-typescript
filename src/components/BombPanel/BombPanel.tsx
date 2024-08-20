import { Bomb } from "@/types";
import BombList from "@/components/BombPanel/BombList";
import Button from "@/components/shared/Button";
import { useActions, useBombs } from "@/contexts/BombContext";

const BombPanel = () => {
  const { bombs, explodedCount, isStartTimer } = useBombs();
  const { startTimer } = useActions();
  const isDisabled = isStartTimer && explodedCount < bombs.length;
  const isAllBombExploded = isStartTimer && explodedCount === bombs.length;

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
        padding: "16px 16px 40px 16px",
        border: "1px #000 solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BombList bombList={bombs} />
      <Button
        color={`${isAllBombExploded ? "error" : "primary"}`}
        disabled={isDisabled}
        onClick={startTimer}
        style={{ marginTop: "40px" }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default BombPanel;
