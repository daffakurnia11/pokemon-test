export interface PokemonListResult {
  name: string;
  url: string;
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
