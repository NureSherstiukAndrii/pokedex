import { combineReducers } from "@reduxjs/toolkit";
import { reducer as pokemonReducer } from "./pokemons/pokemonsSlice";

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
});

export { rootReducer };
