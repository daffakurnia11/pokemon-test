import Typography from "@/components/Typography";
import { typeColorMapping } from "@/utils/colorMapping";
import classNames from "classnames";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "List of Pokemons - Poke API",
  description: "List of Pokemons from Poke API",
};

export default function Home() {
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
        {[...Array(10)].map((_, i) => (
          <div className="col-span-1" key={i}>
            <div className="w-full pb-6 bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 duration-300">
              <div className="w-full p-6 duration-300">
                <Image
                  src={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                  }
                  alt="Pokemon Image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <h2 className="text-lg font-semibold text-center">Bulbasaur</h2>
              <div className="flex gap-x-2 justify-center mt-4">
                <Typography.Text
                  size="xs"
                  className={classNames(
                    "px-4 py-1 rounded-full",
                    typeColorMapping.grass
                  )}
                >
                  Grass
                </Typography.Text>
                <Typography.Text
                  size="xs"
                  className={classNames(
                    "px-4 py-1 rounded-full",
                    typeColorMapping.poison
                  )}
                >
                  Poison
                </Typography.Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
