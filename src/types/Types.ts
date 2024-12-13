import { PokemonTypesDetail } from "./PokemonTypesDetail";

export interface Types {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonTypesDetail[];
}
