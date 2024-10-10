export interface PokemonListResult {
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export interface PokemonListParams {
  limit?: number;
  offset?: number;
}

export interface PokemonDetailType {
  type: {
    name: string;
  };
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      }
    }
  }
  types: PokemonDetailType[];
}
