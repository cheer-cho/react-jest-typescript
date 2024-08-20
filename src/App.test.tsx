import {
  act,
  fireEvent,
  getAllByRole,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";

import App from "./App";

vi.useFakeTimers();

describe("TimerBomb Application", () => {
  it("should render list of bombs and a trigger button", () => {
    render(<App />);

    const bombList = screen.getByRole("list", { name: /list of bomb/i });
    expect(bombList).toBeInTheDocument();

    const bombs = getAllByRole(bombList, "listitem");
    expect(bombs.length).toBeGreaterThanOrEqual(4);

    const triggerButton = screen.getByRole("button", { name: "Explode" });
    expect(triggerButton).toBeInTheDocument();
  });

  it("should render bombs' name and timer", () => {
    render(<App />);

    const bombList = screen.getByRole("list", { name: /list of bomb/i });
    const bombs = getAllByRole(bombList, "listitem");

    for (const index in bombs) {
      expect(bombs[index]).toHaveTextContent(
        `Bomb ${String.fromCharCode(65 + parseInt(index))}`
      );
      expect(bombs[index]).toHaveTextContent("seconds");
    }
  });

  it("should start timer after user click the trigger button", async () => {
    render(<App />);

    const bombList = screen.getByRole("list", { name: /list of bomb/i });
    const bombs = getAllByRole(bombList, "listitem");
    const bombsTimer = bombs.map((bomb) => {
      const timerEl = getByTestId(bomb, "timer") as HTMLSpanElement;
      const time = timerEl.textContent?.split(" ")[0]!;
      return parseInt(time);
    });

    const triggerButton = screen.getByRole("button", { name: "Explode" });
    fireEvent.click(triggerButton);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const bombsTimerAfterStarted = bombs.map((bomb) => {
      const timerEl = getByTestId(bomb, "timer") as HTMLSpanElement;
      const time = timerEl.textContent?.split(" ")[0]!;
      return parseInt(time);
    });

    bombsTimer.forEach((initTimer, index) => {
      expect(initTimer - 3).toEqual(bombsTimerAfterStarted[index]);
    });
  });

  it("should exploded all after the histest timer is passed", async () => {
    render(<App />);

    const bombList = screen.getByRole("list", { name: /list of bomb/i });
    const bombs = getAllByRole(bombList, "listitem");
    let maxTimer = 0;
    const bombsTimer = bombs.map((bomb) => {
      const timerEl = getByTestId(bomb, "timer") as HTMLSpanElement;
      const time = parseInt(timerEl.textContent?.split(" ")[0]!);
      maxTimer = Math.max(maxTimer, time);
      return time;
    });

    const triggerButton = screen.getByRole("button", { name: "Explode" });
    fireEvent.click(triggerButton);

    // Advance timers in steps
    for (let i = 0; i < maxTimer; i++) {
      act(() => {
        // Advance time by 1 second
        vi.advanceTimersByTime(1000);
      });

      // Verify that "Waiting to explode..." is displayed during countdown
      if (i < maxTimer - 1) {
        expect(triggerButton).toHaveTextContent("Waiting to explode...");
      }
    }

    bombs.map((bomb) => {
      const timerEl = getByTestId(bomb, "timer") as HTMLSpanElement;
      expect(timerEl).toHaveTextContent("Exploded");
    });

    expect(
      screen.getByRole("button", { name: "All bombs exploded" })
    ).toBeInTheDocument();
  });
});
