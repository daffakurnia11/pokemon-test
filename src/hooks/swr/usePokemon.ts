import { pokemonApi } from "@/services/apis/pokemon";
import { pokemonListUrl, pokemonSearchUrl } from "@/services/urls/pokemon";
import type { PokemonListParams } from "@/types/pokemon";
import useSWR from "swr";

export const usePokemonList = (params?: PokemonListParams) => {
  const { data, isLoading } = useSWR([pokemonListUrl, params], () =>
    pokemonApi.getPokemons(params)
  );

  return { data, isLoading };
};

export const usePokemonDetail = (url: string) => {
  const { data, isLoading } = useSWR([url], () =>
    pokemonApi.getDetailPokemon(url)
  );

  return { data, isLoading };
};

export const usePokemonByName = (name?: string) => {
  const { data, isLoading } = useSWR(name && pokemonSearchUrl(name), () =>
    pokemonApi.getPokemonByName(name!)
  );

  return { data, isLoading };
};
