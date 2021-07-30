import { render, fireEvent } from "@testing-library/react";
import React from "react";
import App, { ValidateInput, handleSubmit } from "./App";

describe("login", () => {
  test("validate function should pass on correct input", () => {
    const text = "text@text.com";
    expect(ValidateInput(text)).toBe(true);
  });

  test("email input should accept a text", () => {
    const { getByLabelText, getByText } = render(<App />);
    const emailInputNode = getByLabelText("Email:");
    expect(emailInputNode.value).toMatch("");
    fireEvent.change(emailInputNode, { target: { value: "testing" } });
    expect(emailInputNode.value).toMatch("testing");

    const errorMessageNode = getByText("Email not valid");
    expect(errorMessageNode).toBeInTheDocument();

    fireEvent.change(emailInputNode, { target: { value: "testing@" } });
    expect(errorMessageNode).not.toBeInTheDocument();
  });

  // MAIN TASK TO DO
  test("should fail when the api is called", () => {
    const { getByRole } = render(<App />);
    const buttonNode = getByRole("button");
    fireEvent.submit(buttonNode);
    expect(buttonNode).toThrow(
      "SyntaxError: Unexpected token A in JSON at position 0"
    );
  });
});
