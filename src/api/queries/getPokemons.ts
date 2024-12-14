import { PokemonDetails, PokemonsList } from "@/types";

export const getPokemons = async (
  arr: PokemonsList[]
): Promise<PokemonDetails[]> => {
  const newArr: PokemonDetails[] = await Promise.all(
    arr.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokemonWithDetails = await res.json();

      return pokemonWithDetails;
    })
  );

  return newArr;
};
