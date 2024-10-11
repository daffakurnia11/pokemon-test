"use client";

import React from "react";
import Typography from "@/components/Typography";
import { usePokemonByName, usePokemonList } from "@/hooks/swr/usePokemon";
import Card from "@/components/Card";
import { PokemonListResult } from "@/types/pokemon";
import { useAtomValue } from "jotai";
import { searchAtom } from "@/utils/atoms";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export default function PokemonList() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const search = useAtomValue(searchAtom);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { data, isLoading } = usePokemonList({ limit, offset });

  const { data: detailData, isLoading: detailLoading } =
    usePokemonByName(search);

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
        List of Pokemon
      </Typography.Heading>
      <div className="flex justify-center flex-wrap gap-4">
        {isLoading || detailLoading ? (
          [...Array(10)].map((_, i: number) => <Card.Loading key={i} />)
        ) : search && detailData ? (
          <Card.Pokemon {...detailData} />
        ) : (
          data?.results.map((data: PokemonListResult, i: number) => (
            <Card.List key={i} url={data.url} />
          ))
        )}
      </div>
      {!search && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevPage}
            className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentPage === 1 || isLoading}
            aria-label="Previous page"
          >
            <MdNavigateBefore size={24} className="text-white" />
          </button>
          <div className="w-[30px]">
            <Typography.Text className="font-medium text-center">
              {currentPage}
            </Typography.Text>
          </div>
          <button
            onClick={handleNextPage}
            className="px-2 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={isLoading || !data?.next}
            aria-label="Next page"
          >
            <MdNavigateNext size={24} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
