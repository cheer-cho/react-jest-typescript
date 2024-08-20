import { Bomb } from "types";
import BombPanel from "../BombPanel";
import {
  fireEvent,
  logRoles,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

vi.useFakeTimers();

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

describe("App Component", () => {
  it("should render a bomb list and a trigger button", () => {
    render(<BombPanel allBombs={mockedBombList} />);

    expect(
      screen.getByRole("list", { name: /list of bomb/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Explode" })).toBeInTheDocument();
  });

  it("should allow user to trigger bomb(s)", async () => {
    render(<BombPanel allBombs={mockedBombList} />);

    const triggerButton = screen.getByRole("button", { name: "Explode" });
    expect(triggerButton).toBeInTheDocument();
    fireEvent.click(triggerButton);

    const updatedButton = screen.getByRole("button", {
      name: "Waiting to explode...",
    });
    expect(updatedButton).toBeInTheDocument();
  });

  it("should show bombs states via button correctly", () => {
    render(<BombPanel allBombs={mockedBombList} />);

    const triggerButton = screen.getByRole("button", { name: "Explode" });
    expect(triggerButton).toBeInTheDocument();
    fireEvent.click(triggerButton);

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(triggerButton).toHaveTextContent("Waiting to explode...");

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(triggerButton).toHaveTextContent("All bombs exploded");
  });
});
