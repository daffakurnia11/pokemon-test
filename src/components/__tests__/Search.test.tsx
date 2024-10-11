import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../Input/Search";
import { useSetAtom } from "jotai";
import React from "react";

jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  useSetAtom: jest.fn(),
}));

describe("Search Component", () => {
  const mockSetSearch = jest.fn();

  beforeEach(() => {
    (useSetAtom as jest.Mock).mockReturnValue(mockSetSearch);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should render with the default placeholder", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search");
    expect(input).toBeInTheDocument();
  });

  it("should render with a custom placeholder", () => {
    render(<Search placeholder="Find a Pokémon" />);
    const input = screen.getByPlaceholderText("Find a Pokémon");
    expect(input).toBeInTheDocument();
  });

  it("should update search value after a delay", async () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "bulbasaur" } });

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(mockSetSearch).toHaveBeenCalledWith("bulbasaur");
    });
  });

  it("should debounce multiple input changes", async () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "bulba" } });
    fireEvent.change(input, { target: { value: "bulbasaur" } });

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(mockSetSearch).toHaveBeenCalledTimes(1);
      expect(mockSetSearch).toHaveBeenCalledWith("bulbasaur");
    });
  });
});
