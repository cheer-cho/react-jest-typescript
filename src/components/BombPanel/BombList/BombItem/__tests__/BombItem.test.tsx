import { render, screen } from "@testing-library/react";
import { useActions, useTimer } from "@/contexts/BoContext";

import BombItem from "..";

// mock Context
vi.mock("@/contexts/BoContext", () => ({
  useActions: vi.fn(),
  useTimer: vi.fn(),
}));

describe("BombItem Component", () => {
  it("should have correct image, heading and initial time", () => {
    vi.mocked(useTimer).mockReturnValueOnce({ timer: 0 });
    vi.mocked(useActions).mockReturnValue({
      bombExploded: vi.fn,
      startTimer: vi.fn,
    });

    render(<BombItem bomb={{ initialTime: 10, name: "Bomb A" }} />);

    const image = screen.getByRole("img", {
      name: "Bomb A",
    }) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image).toHaveProperty("src");
    expect(image.src).toContain("/src/assets/images/bomb-60x60.png");

    expect(
      screen.getByRole("heading", { level: 2, name: "Bomb A" })
    ).toBeInTheDocument();

    expect(screen.getByText("10 seconds")).toBeInTheDocument();
  });

  it("should counts down correctly when started", () => {
    // mock timer
    vi.mocked(useTimer).mockReturnValueOnce({ timer: 2 });
    vi.mocked(useActions).mockReturnValue({
      bombExploded: vi.fn,
      startTimer: vi.fn,
    });
    render(<BombItem bomb={{ initialTime: 3, name: "Bomb A" }} />);

    expect(screen.getByText("1 seconds")).toBeInTheDocument();
  });

  it("should show Exploded word instead of timer, when reaches 0", () => {
    const mockedHandleBombExplodedFn = vi.fn();
    vi.mocked(useTimer).mockReturnValueOnce({ timer: 10 });
    vi.mocked(useActions).mockReturnValue({
      bombExploded: mockedHandleBombExplodedFn,
      startTimer: vi.fn,
    });
    render(<BombItem bomb={{ initialTime: 10, name: "Bomb A" }} />);

    expect(screen.queryByText("seconds")).not.toBeInTheDocument();
    expect(screen.getByText("Exploded")).toBeInTheDocument();
    expect(mockedHandleBombExplodedFn).toHaveBeenCalledOnce();
  });
});
