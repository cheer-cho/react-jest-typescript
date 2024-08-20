import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ListItem from "..";

describe("ListItem Component", () => {
  it("should render with the correct children", () => {
    render(<ListItem>Test Child</ListItem>);

    // Check if the ListItem renders with the correct child text
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should apply the correct styles", () => {
    render(<ListItem>Styled Item</ListItem>);

    const listItem = screen.getByText("Styled Item");

    // Check if the ListItem has the correct inline styles
    expect(listItem).toHaveStyle("display: flex");
    expect(listItem).toHaveStyle("align-items: center");
    expect(listItem).toHaveStyle("justify-content: space-between");
    expect(listItem).toHaveStyle("width: 400px");
    expect(listItem).toHaveStyle("height: 100px");
    expect(listItem).toHaveStyle("border: 1px black solid");
    expect(listItem).toHaveStyle("padding: 8px 20px");
  });
});
