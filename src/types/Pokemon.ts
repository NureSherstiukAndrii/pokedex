import { PokemonTypes } from "./PokemonTypes";

interface PokemonImage {
  front_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonTypes[];
  sprites: PokemonImage;
}
