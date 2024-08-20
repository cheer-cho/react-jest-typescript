import React from "react";

import { Bomb } from "@/types";

import BombItem from "./BombItem";

type BombList = {
  bombList: Bomb[];
};

const BombList = ({ bombList }: BombList) => {
  return (
    <ul aria-label="list of bomb" style={{ listStyle: "none" }}>
      {bombList.map((bomb, index) => (
        <li
          key={bomb.name}
          style={{ marginBottom: index === bombList.length - 1 ? "0" : "16px" }}
        >
          <BombItem bomb={bomb} />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(BombList);
