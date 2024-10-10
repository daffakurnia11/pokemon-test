import {
  PokemonDetailResponse,
  PokemonDetailType,
  PokemonListResult,
} from "@/types/pokemon";
import Image from "next/image";
import React from "react";
import Typography from "../Typography";
import classNames from "classnames";
import { typeColorMapping } from "@/utils/colorMapping";
import { usePokemonDetail } from "@/hooks/swr/usePokemon";
import CardLoading from "./Loading";

export function CardList({ url }: PokemonListResult) {
  const { data, isLoading } = usePokemonDetail(url);

  return data && !isLoading ? <CardPokemon {...data} /> : <CardLoading />;
}

export function CardPokemon(props: PokemonDetailResponse) {
  const typeColor = (type: string): string => {
    return typeColorMapping.find((item) => item.type === type)!.color;
  };

  return (
    <div className="w-[240px]">
      <div className="w-full p-6 bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 duration-300">
        {props.sprites.other.dream_world.front_default ? (
          <div className="h-full aspect-square pb-3 duration-300">
            <Image
              src={props.sprites.other.dream_world.front_default ?? ""}
              alt="Pokemon Image"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "100%" }}
              className="mx-auto"
            />
          </div>
        ) : (
          <div className="w-full h-full aspect-square pb-3 duration-300 flex justify-center items-center">
            <Typography.Text
              size="lg"
              className="text-center font-semibold text-gray-500 italic"
            >
              No Image
            </Typography.Text>
          </div>
        )}
        <Typography.Heading
          as="h2"
          level={6}
          className="font-semibold text-center"
        >
          {props.name.toUpperCase()}
        </Typography.Heading>
        <div className="flex gap-x-2 justify-center mt-2">
          {props.types.map((type: PokemonDetailType, i: number) => (
            <Typography.Text
              key={i}
              size="xs"
              className={classNames(
                "px-4 py-1 rounded-full",
                typeColor(type.type.name)
              )}
            >
              {type.type.name.toUpperCase()}
            </Typography.Text>
          ))}
        </div>
      </div>
    </div>
  );
}
