import { pokemonApi } from "@/services/apis/pokemon";
import { pokemonList } from "@/services/urls/pokemon";
import type { PokemonListParams } from "@/types/pokemon";
import useSWR from "swr";

export const usePokemonList = (params?: PokemonListParams) => {
  const result = useSWR([pokemonList, params], () =>
    pokemonApi.getPokemons(params)
  );

  return result;
};

export const usePokemonDetail = (url: string) => {
  const result = useSWR([url], () => pokemonApi.getDetailPokemon(url));

  return result;
};
