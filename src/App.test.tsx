import React from "react";
import {
  fireEvent,
  getByRole,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe('testing "input" behavior', () => {
  test("Empty string input", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "{enter}");
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
  test('"New todo" input', () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "new todo{enter}");
    expect(screen.queryByRole("listitem")).toBeInTheDocument();
  });
});

describe("testing tasks lists logic", () => {
  test("testing Active list elements", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "new todo{enter}");
    userEvent.type(input, "new todo1{enter}");
    userEvent.type(input, "new todo2{enter}");
    userEvent.type(input, "new todo3{enter}");

    userEvent.click(await screen.findByText("new todo", { exact: true }));
    userEvent.click(screen.getByText("Active"));
    expect(screen.queryByText("new todo")).not.toBeInTheDocument();
  });
  test("testing Active list elements when user clicked on todo (have to dissapear)", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "new todo{enter}");
    userEvent.type(input, "new todo1{enter}");
    userEvent.type(input, "new todo2{enter}");
    userEvent.type(input, "new todo3{enter}");
    userEvent.click(screen.getByText("Active"));

    userEvent.click(await screen.findByText("new todo", { exact: true }));

    expect(screen.queryByText("new todo")).not.toBeInTheDocument();
  });
  test("testing Completed list elements", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "new todo{enter}");
    userEvent.type(input, "new todo1{enter}");
    userEvent.type(input, "new todo2{enter}");
    userEvent.type(input, "new todo3{enter}");

    userEvent.click(await screen.findByText("new todo", { exact: true }));
    userEvent.click(await screen.findByText("new todo1", { exact: true }));

    userEvent.click(screen.getByText("Completed"));
    expect(screen.getByText("new todo")).toBeInTheDocument();
    expect(screen.getByText("new todo1")).toBeInTheDocument();
  });
});

test('testing "clear completed" button', async () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  userEvent.type(input, "new todo{enter}");
  userEvent.type(input, "new todo1{enter}");
  userEvent.type(input, "new todo2{enter}");
  userEvent.type(input, "new todo3{enter}");

  userEvent.click(await screen.findByText("new todo", { exact: true }));
  userEvent.click(await screen.findByText("new todo1", { exact: true }));

  userEvent.click(screen.getByText("Clear completed"));
  userEvent.click(screen.getByText("Completed"));
  expect(screen.queryByText("new todo")).not.toBeInTheDocument();
  expect(screen.queryByText("new todo1")).not.toBeInTheDocument();
});

test('render "You are free!" message', async () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  userEvent.type(input, "new todo{enter}");
  userEvent.type(input, "new todo1{enter}");

  userEvent.click(await screen.findByText("new todo", { exact: true }));
  userEvent.click(await screen.findByText("new todo1", { exact: true }));

  userEvent.click(screen.getByText("Clear completed"));

  expect(screen.getByText("You are free!")).toBeInTheDocument();
});
