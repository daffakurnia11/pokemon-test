import { usePokemonByName, usePokemonDetail, usePokemonList } from "../swr/usePokemon";
import { renderHook, waitFor } from "@testing-library/react";
import type { PokemonDetailResponse, PokemonListResponse } from "@/types/pokemon";
import useSWR from "swr";
import { pokemonListUrl, pokemonSearchUrl } from "@/services/urls/pokemon";
import { pokemonApi } from "@/services/apis/pokemon";

jest.mock("swr");
jest.mock("../../services/apis/pokemon", () => ({
  pokemonApi: {
    getPokemons: jest.fn(),
    getDetailPokemon: jest.fn(),
    getPokemonByName: jest.fn(),
  },
}));

const mockPokemonApi = pokemonApi.getPokemons as jest.MockedFunction<
  typeof pokemonApi.getPokemons
>;

const mockPokemonDetailApi = pokemonApi.getDetailPokemon as jest.MockedFunction<
  typeof pokemonApi.getDetailPokemon
>;

const mockPokemonByNameApi = pokemonApi.getPokemonByName as jest.MockedFunction<
  typeof pokemonApi.getPokemonByName
>;

const mockPokemonList: PokemonListResponse = {
  count: 1118,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [
    {
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
  ],
};

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

describe("usePokemonList Hook", () => {
  it("should be defined", () => {
    expect(usePokemonList).toBeDefined();
  });

  it("should call useSWR with correct arguments", () => {
    const params = { limit: 20, offset: 0 };
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    renderHook(() => usePokemonList(params));

    expect(useSWR).toHaveBeenCalledWith(
      [pokemonListUrl, params],
      expect.any(Function)
    );
  });

  it("should call pokemonApi.getPokemons with correct params", async () => {
    const params = { limit: 20, offset: 0 };
    mockPokemonApi.mockResolvedValueOnce(mockPokemonList);

    (useSWR as jest.Mock).mockImplementation((key, fetcher) => {
      if (key[0] === pokemonListUrl && key[1] === params) {
        fetcher();
        return { data: mockPokemonList, isLoading: false };
      }
      return { data: undefined, isLoading: true };
    });

    renderHook(() => usePokemonList(params));

    await waitFor(() => {
      expect(mockPokemonApi).toHaveBeenCalledWith(params);
    });
  });

  it("should return loading state initially", () => {
    (useSWR as jest.Mock).mockReturnValue({ isLoading: true });

    const { result } = renderHook(() => usePokemonList());
    expect(result.current.isLoading).toBe(true);
  });

  it("should return pokemon list", async () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: mockPokemonList,
      isLoading: false,
    });

    const { result } = renderHook(() => usePokemonList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockPokemonList);
    });
  });
});

describe("usePokemonDetail Hook", () => {
  const url = "https://pokeapi.co/api/v2/pokemon/1/";

  it("should be defined", () => {
    expect(usePokemonDetail).toBeDefined();
  });

  it("should call useSWR with correct arguments", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    renderHook(() => usePokemonDetail(url));

    expect(useSWR).toHaveBeenCalledWith(
      [url],
      expect.any(Function)
    );
  });

  it("should call pokemonApi.getDetailPokemon with correct url", async () => {
    mockPokemonDetailApi.mockResolvedValueOnce(mockPokemonDetail);

    (useSWR as jest.Mock).mockImplementation((key, fetcher) => {
      if (key[0] === url) {
        fetcher();
        return { data: mockPokemonList, isLoading: false };
      }
      return { data: undefined, isLoading: true };
    });

    renderHook(() => usePokemonDetail(url));

    await waitFor(() => {
      expect(mockPokemonDetailApi).toHaveBeenCalledWith(url);
    });
  });

  it("should return loading state initially", () => {
    (useSWR as jest.Mock).mockReturnValue({ isLoading: true });

    const { result } = renderHook(() => usePokemonDetail(url));
    expect(result.current.isLoading).toBe(true);
  });

  it("should return pokemon detail", async () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: mockPokemonDetail,
      isLoading: false,
    });

    const { result } = renderHook(() => usePokemonDetail(url));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockPokemonDetail);
    });
  });
});

describe("usePokemonByName Hook", () => {
  it("should be defined", () => {
    expect(usePokemonByName).toBeDefined();
  });

  it("should call useSWR with correct arguments", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    renderHook(() => usePokemonByName("bulbasaur"));

    expect(useSWR).toHaveBeenCalledWith(
      pokemonSearchUrl("bulbasaur"),
      expect.any(Function)
    );
  });

  it("should call pokemonApi.getPokemonByName with correct url", async () => {
    mockPokemonByNameApi.mockResolvedValueOnce(mockPokemonDetail);

    (useSWR as jest.Mock).mockImplementation((key, fetcher) => {
      if (key === pokemonSearchUrl("bulbasaur")) {
        fetcher();
        return { data: mockPokemonList, isLoading: false };
      }
      return { data: undefined, isLoading: true };
    });

    renderHook(() => usePokemonByName("bulbasaur"));

    await waitFor(() => {
      expect(mockPokemonByNameApi).toHaveBeenCalledWith("bulbasaur");
    });
  });

  it("should return loading state initially", () => {
    (useSWR as jest.Mock).mockReturnValue({ isLoading: true });

    const { result } = renderHook(() => usePokemonByName("bulbasaur"));
    expect(result.current.isLoading).toBe(true);
  });

  it("should return pokemon detail", async () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: mockPokemonDetail,
      isLoading: false,
    });

    const { result } = renderHook(() => usePokemonByName("bulbasaur"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockPokemonDetail);
    });
  });
});

