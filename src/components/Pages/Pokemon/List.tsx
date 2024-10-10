"use client";

import React from "react";
import Typography from "@/components/Typography";
import { usePokemonList } from "@/hooks/swr/usePokemon";
import Card from "@/components/Card";
import { PokemonListResult } from "@/types/pokemon";

export default function PokemonList() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { data, isLoading } = usePokemonList({ limit, offset });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container my-6 pt-[64px]">
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
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1 || isLoading}
        >
          Previous
        </button>
        <span className="text-lg font-medium">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={isLoading || !data?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
