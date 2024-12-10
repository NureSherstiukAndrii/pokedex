import { PokemonDetails } from "@/types";
import { API_URL } from "../urls";

export const getPokemon = async (
  id: number
): Promise<PokemonDetails | undefined> => {
  try {
    const res = await fetch(`${API_URL}/pokemon/${id}`);
    //add types
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
