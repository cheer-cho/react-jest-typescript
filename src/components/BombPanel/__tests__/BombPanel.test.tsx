import { Bomb } from "@/types";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { BombContext, useActions, useBombs } from "@/contexts/BoContext";

import BombPanel from "..";

// Partially mock the BoContext module
vi.mock("@/contexts/BoContext", async () => {
  const originalModule = await vi.importActual<typeof BombContext>(
    "@/contexts/BoContext"
  );

  return {
    ...originalModule,
    useActions: vi.fn(),
    useBombs: vi.fn(),
  };
});

const mockedBombList: Bomb[] = [
  {
    name: "Bomb A",
    initialTime: 16,
  },
  {
    name: "Bomb B",
    initialTime: 11,
  },
  {
    name: "Bomb C",
    initialTime: 16,
  },
  {
    name: "Bomb D",
    initialTime: 20,
  },
  {
    name: "Bomb E",
    initialTime: 16,
  },
];

const mockedStartTimerFn = vi.fn();

describe("BombPanel Component", () => {
  it("should render a bomb list and a trigger button", () => {
    vi.mocked(useBombs).mockReturnValueOnce({
      bombs: mockedBombList,
      explodedCount: 0,
      isStartTimer: false,
    });
    vi.mocked(useActions).mockReturnValue({
      startTimer: vi.fn,
      bombExploded: vi.fn,
    });

    render(<BombPanel />);

    expect(
      screen.getByRole("list", { name: /list of bomb/i })
    ).toBeInTheDocument();

    const triggerButton = screen.getByRole("button", {
      name: "Explode",
    });
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).not.toBeDisabled();
  });

  it("should allow user to trigger bomb(s)", async () => {
    vi.mocked(useBombs).mockReturnValueOnce({
      bombs: mockedBombList,
      explodedCount: 0,
      isStartTimer: false,
    });
    vi.mocked(useActions).mockReturnValue({
      startTimer: mockedStartTimerFn,
      bombExploded: vi.fn,
    });

    render(<BombPanel />);

    const triggerButton = screen.getByRole("button", { name: "Explode" });
    expect(triggerButton).toBeInTheDocument();
    await userEvent.click(triggerButton);
    expect(mockedStartTimerFn).toHaveBeenCalledOnce();
  });

  it("should disable the button after triggerred", () => {
    vi.mocked(useBombs).mockReturnValueOnce({
      bombs: mockedBombList,
      explodedCount: 3,
      isStartTimer: true,
    });
    vi.mocked(useActions).mockReturnValue({
      startTimer: mockedStartTimerFn,
      bombExploded: vi.fn,
    });

    render(<BombPanel />);

    const triggerButton = screen.getByRole("button", {
      name: "Waiting to explode...",
    });
    expect(triggerButton).toBeDisabled();
  });

  it("should show bombs states via button correctly", () => {
    vi.mocked(useBombs).mockReturnValueOnce({
      bombs: mockedBombList,
      explodedCount: 3,
      isStartTimer: true,
    });
    vi.mocked(useActions).mockReturnValue({
      startTimer: mockedStartTimerFn,
      bombExploded: vi.fn,
    });

    render(<BombPanel />);

    expect(
      screen.getByRole("button", { name: "Waiting to explode..." })
    ).toBeInTheDocument();

    vi.mocked(useBombs).mockReturnValueOnce({
      bombs: mockedBombList,
      explodedCount: 5,
      isStartTimer: true,
    });

    render(<BombPanel />);

    expect(
      screen.getByRole("button", { name: "All bombs exploded" })
    ).toBeInTheDocument();
  });
});
