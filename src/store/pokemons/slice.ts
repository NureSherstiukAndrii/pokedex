import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadPokemons, loadTypes } from "./actions";
import { Pokemon } from "@/types";

type State = {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  pokemonTypes: string[];
  selectedFilters: string[];
};

const initialState: State = {
  pokemons: [],
  filteredPokemons: [],
  pokemonTypes: [],
  selectedFilters: [],
};

const { reducer, actions, name } = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<string[]>) {
      state.selectedFilters = action.payload;
    },
    clearFilters(state) {
      state.selectedFilters = [];
      state.filteredPokemons = state.pokemons;
    },
    setFilteredPokemons(state) {
      state.filteredPokemons = state.pokemons.filter((pokemon) => {
        const { types } = pokemon;
        const pokemonTypes = types.map((elem) => elem.type.name);

        return pokemonTypes.some((type) =>
          state.selectedFilters.includes(type)
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload;
      state.filteredPokemons = action.payload;
    });
    builder.addCase(loadTypes.fulfilled, (state, action) => {
      state.pokemonTypes = action.payload;
    });
  },
});

export { reducer, name, actions };
