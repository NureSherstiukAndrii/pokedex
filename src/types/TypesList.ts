import { PokemonTypesDetail } from "./PokemonTypesDetail";

export interface TypesList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonTypesDetail[];
}
