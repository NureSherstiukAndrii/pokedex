import { Pokemon, PokemonsList } from "@/types";

export const getPokemons = async (arr: PokemonsList[]): Promise<Pokemon[]> => {
  const newArr: Pokemon[] = await Promise.all(
    arr.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokemonWithDetails = await res.json();

      return pokemonWithDetails;
    })
  );

  return newArr;
};
