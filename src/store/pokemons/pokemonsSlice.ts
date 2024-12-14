import { loadPokemons, loadTypes } from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  loadPokemons,
  loadTypes,
};

export { allActions as actions, reducer };
