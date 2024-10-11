import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Card from "..";
import { PokemonDetailResponse } from "@/types/pokemon";
import { usePokemonDetail } from "@/hooks/swr/usePokemon";

jest.mock("@/hooks/swr/usePokemon", () => ({
  usePokemonDetail: jest.fn(),
}));

const mockUsePokemonDetail = usePokemonDetail as jest.MockedFunction<
  typeof usePokemonDetail
>;

const mockPokemonDetail: PokemonDetailResponse = {
  id: 1,
  name: "bulbasaur",
  sprites: {
    other: {
      dream_world: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
      },
    },
  },
  types: [
    {
      type: {
        name: "grass",
      },
    },
    {
      type: {
        name: "poison",
      },
    },
  ],
};

describe("Loading Card", () => {
  it("should render loading card correctly", () => {
    mockUsePokemonDetail.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<Card.List url="https://pokeapi.co/api/v2/pokemon/1/" />);

    const imageSkeleton = screen.getByTestId("skeleton-image");
    expect(imageSkeleton).toBeInTheDocument();

    const headingSkeleton = screen.getByTestId("skeleton-heading");
    expect(headingSkeleton).toBeInTheDocument();

    const typeSkeleton = screen.getAllByTestId("skeleton-type");
    expect(typeSkeleton).toHaveLength(2);
  });
});

describe("Pokemon Card", () => {
  it("should render Pokemon list correctly", () => {
    mockUsePokemonDetail.mockReturnValue({
      data: mockPokemonDetail,
      isLoading: false,
    });

    render(<Card.List url="https://pokeapi.co/api/v2/pokemon/1/" />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("BULBASAUR");

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      mockPokemonDetail.sprites.other.dream_world.front_default
    );

    const type1 = screen.getByText(/grass/i);
    expect(type1).toBeInTheDocument();
    expect(type1).toHaveTextContent("GRASS");

    const type2 = screen.getByText(/poison/i);
    expect(type2).toBeInTheDocument();
    expect(type2).toHaveTextContent("POISON");
  });

  it("should render Pokemon card correctly", () => {
    render(<Card.Pokemon {...mockPokemonDetail} />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();

    const type1 = screen.getByText(/grass/i);
    expect(type1).toBeInTheDocument();

    const type2 = screen.getByText(/poison/i);
    expect(type2).toBeInTheDocument();
  });
});
