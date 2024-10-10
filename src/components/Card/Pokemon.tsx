import { PokemonDetailType, PokemonListResult } from "@/types/pokemon";
import Image from "next/image";
import React from "react";
import Typography from "../Typography";
import classNames from "classnames";
import { typeColorMapping } from "@/utils/colorMapping";
import { usePokemonDetail } from "@/hooks/swr/usePokemon";
import CardLoading from "./Loading";

export default function CardPokemon({ name, url }: PokemonListResult) {
  const { data, isLoading } = usePokemonDetail(url);

  const typeColor = (type: string): string => {
    return typeColorMapping.find((item) => item.type === type)!.color;
  };

  return data && !isLoading ? (
    <div className="w-full p-6 bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 duration-300">
      <div className="h-full aspect-square pb-3 duration-300">
        <Image
          src={data.sprites.other.dream_world.front_default}
          alt="Pokemon Image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "100%" }}
          className="mx-auto"
        />
      </div>
      <Typography.Heading
        as="h2"
        level={6}
        className="font-semibold text-center"
      >
        {name.toUpperCase()}
      </Typography.Heading>
      <div className="flex gap-x-2 justify-center mt-2">
        {data.types.map((type: PokemonDetailType, i: number) => (
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
  ) : (
    <CardLoading />
  );
}
