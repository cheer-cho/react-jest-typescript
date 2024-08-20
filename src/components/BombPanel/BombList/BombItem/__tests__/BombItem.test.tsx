import { act, render, screen } from "@testing-library/react";
import BombItem from "../BombItem";

vi.useFakeTimers();
const mockedHandleBombExplodedFn = vi.fn();

describe("BombItem Component", () => {
  it("should have correct image, heading and initial time", () => {
    render(
      <BombItem
        isStartCountDown={false}
        bomb={{ initialTime: 10, name: "Bomb A" }}
        onBombExploded={() => {}}
      />
    );

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
    render(
      <BombItem
        isStartCountDown={true}
        bomb={{ initialTime: 3, name: "Bomb A" }}
        onBombExploded={() => {}}
      />
    );

    expect(screen.getByText("3 seconds")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("2 seconds")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("1 seconds")).toBeInTheDocument();
  });

  it("should show Exploded word instead of timer, when reaches 0", () => {
    render(
      <BombItem
        isStartCountDown={true}
        bomb={{ initialTime: 3, name: "Bomb A" }}
        onBombExploded={mockedHandleBombExplodedFn}
      />
    );

    expect(screen.getByText("3 seconds")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByText("seconds")).not.toBeInTheDocument();
    expect(screen.getByText("Exploded")).toBeInTheDocument();
    expect(mockedHandleBombExplodedFn).toHaveBeenCalledOnce();
  });
});
