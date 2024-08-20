import { getAllByRole, render, screen } from "@testing-library/react";
import { Bomb } from "@/types";

import BombList from "..";

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

describe("BombList Component", () => {
  it("should correctly render a list of bomb", () => {
    render(<BombList bombList={mockedBombList} />);

    const bombList = screen.getByRole("list", { name: /list of bomb/i });
    expect(bombList).toBeInTheDocument();
    const bombItems = getAllByRole(bombList, "listitem");
    expect(bombItems).toHaveLength(mockedBombList.length);

    for (const index in bombItems) {
      expect(bombItems[index]).toHaveTextContent(mockedBombList[index].name);
      expect(bombItems[index]).toHaveTextContent(
        mockedBombList[index].initialTime.toString()
      );
    }
  });
});
