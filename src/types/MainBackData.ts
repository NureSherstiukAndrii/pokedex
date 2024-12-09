import { PokemonsList } from "./PokemonsList";

export interface MainBackData {
  count: number;
  next: string | null;
  prev: string | null;
  results: PokemonsList[];
}
