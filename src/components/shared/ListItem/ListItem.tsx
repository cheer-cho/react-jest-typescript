import { ReactElement } from "react";

const ListItem = ({ children }: { children: ReactElement }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "400px",
        height: "100px",
        border: "1px black solid",
        padding: "8px 20px",
      }}
    >
      {children}
    </div>
  );
};
export default ListItem;
