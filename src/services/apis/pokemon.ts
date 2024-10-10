import { ApiService } from "./api-service";
import * as url from "../urls/pokemon";
import type { PokemonDetailResponse, PokemonListParams, PokemonListResponse } from "@/types/pokemon";

class PokemonApi extends ApiService {
  public async getPokemons(params?: PokemonListParams) {
    const response = await this.get<PokemonListResponse>(url.pokemonList, params);
    return response;
  }

  public async getDetailPokemon(url: string) {
    const response = await this.get<PokemonDetailResponse>(url);
    return response
  }
}

export const pokemonApi = new PokemonApi();
