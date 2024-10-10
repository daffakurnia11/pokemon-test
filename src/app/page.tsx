import PokemonList from "@/components/Pages/Pokemon/List";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List of Pokemons - Poke API",
  description: "List of Pokemons from Poke API",
};

export default function Home() {
  return <PokemonList />;
}
