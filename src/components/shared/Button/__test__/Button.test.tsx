import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "..";

describe("Button Component", () => {
  it("should render with the correct children", () => {
    render(<Button color="primary">Click Me</Button>);

    // Check if the button renders with the correct text
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  it("should apply primary styles", () => {
    render(<Button color="primary">Primary Button</Button>);

    const button = screen.getByRole("button");

    // Check if the button has the primary background and border colors
    expect(button).toHaveStyle("background-color: #dcbdf6");
    expect(button).toHaveStyle("border: 1px #966eb7 solid");
  });

  it("should apply error styles", () => {
    render(<Button color="error">Error Button</Button>);

    const button = screen.getByRole("button");

    // Check if the button has the error background and border colors
    expect(button).toHaveStyle("background-color: #e4b6b6");
    expect(button).toHaveStyle("border: 1px #d64949 solid");
  });

  it("should call onClick when clicked", async () => {
    const mockedHandleClick = vi.fn();
    render(
      <Button color="primary" onClick={mockedHandleClick}>
        Click Me
      </Button>
    );

    const button = screen.getByRole("button");

    // Simulate a click event
    await userEvent.click(button);

    // Verify that the onClick handler was called
    expect(mockedHandleClick).toHaveBeenCalledTimes(1);
  });
});
