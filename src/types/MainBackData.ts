import { PokemonsList } from "./PokemonsList";

export interface MainBackData {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonsList[];
}
