import { Pokemon } from "./Pokemon";
import { PokemonStats } from "./PokemonStats";

export interface PokemonDetails extends Pokemon {
  moves: string[];
  stats: PokemonStats[];
  order: number;
  weight: number;
}
