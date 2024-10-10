"use client";

import React from "react";
import Typography from "@/components/Typography";
import { usePokemonList } from "@/hooks/swr/usePokemon";
import Card from "@/components/Card";
import { PokemonListResult } from "@/types/pokemon";

export default function PokemonList() {
  const { data, isLoading } = usePokemonList({ limit: 10, offset: 0 });

  return (
    <div className="container my-6">
      <Typography.Heading
        level={4}
        as="h1"
        className="font-bold mb-5 text-center"
      >
        List of Pokemons
      </Typography.Heading>
      <div className="grid grid-cols-5 gap-4">
        {isLoading
          ? [...Array(10)].map((_, i: number) => (
              <div className="col-span-1" key={i}>
                <Card.Loading />
              </div>
            ))
          : data?.results.map((data: PokemonListResult, i: number) => (
              <div className="col-span-1" key={i}>
                <Card.Pokemon name={data.name} url={data.url} />
              </div>
            ))}
      </div>
    </div>
  );
}
