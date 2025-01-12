import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import { TabButton } from "@/app/stocks/_components/TabButton";

describe("TabButton component", () => {
  it("renders children correctly", () => {
    render(
      <TabButton active={false} onClick={() => {}}>
        Home
      </TabButton>
    );
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
  });

  it("has correct classes when active = true", () => {
    render(
      <TabButton active={true} onClick={() => {}}>
        Active Tab
      </TabButton>
    );

    const button = screen.getByRole("button", { name: /active tab/i });
    expect(button).toHaveClass("text-blue-600");
    const underlineDiv = button.querySelector("div");
    expect(underlineDiv).toBeInTheDocument();
    expect(underlineDiv).toHaveClass("absolute", "bottom-0", "left-0", "right-0", "h-0.5", "bg-blue-600", "-mb-px");
  });

  it("has correct classes when active = false", () => {
    render(
      <TabButton active={false} onClick={() => {}}>
        Inactive Tab
      </TabButton>
    );

    const button = screen.getByRole("button", { name: /inactive tab/i });
    expect(button).toHaveClass("text-gray-500");
    const underlineDiv = button.querySelector("div");
    expect(underlineDiv).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();

    render(
      <TabButton active={false} onClick={handleClick}>
        Click Me
      </TabButton>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the correct classes in addition to defaults", () => {
    render(
      <TabButton active={false} onClick={() => {}}>
        Extra Check
      </TabButton>
    );

    const button = screen.getByRole("button", { name: /extra check/i });
    expect(button).toHaveClass("px-4", "py-2", "font-medium", "relative");
  });
  it("handles dynamic children", () => {
    const text = "Dynamic Text";
    render(
      <TabButton active={false} onClick={() => {}}>
        {text}
      </TabButton>
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
