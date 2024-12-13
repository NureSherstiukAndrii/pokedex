import { loadPokemons, loadTypes, loadPokemon } from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  loadPokemons,
  loadTypes,
  loadPokemon,
};

export { allActions as actions, reducer };
