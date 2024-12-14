import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loadPokemons, loadTypes } from "./actions";
import { PokemonDetails } from "@/types";
import { DataStatus } from "@/enums/DataStatus";

export type State = {
  pokemons: PokemonDetails[];
  selectedPokemon: PokemonDetails | null;
  currentPokemonId: number | null;
  pokemonTypes: string[];
  selectedFilters: string[];
  listStatus: DataStatus;
};

const initialState: State = {
  pokemons: [],
  selectedPokemon: null,
  currentPokemonId: null,
  pokemonTypes: [],
  selectedFilters: [],
  listStatus: DataStatus.IDLE,
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
    },
    setCurrentPokemonId(state, action: PayloadAction<number>) {
      state.currentPokemonId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPokemons.pending, (state) => {
      state.listStatus = DataStatus.PENDING;
    });
    builder.addCase(loadPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload;
      state.listStatus = DataStatus.SUCCESS;
    });
    builder.addCase(loadTypes.fulfilled, (state, action) => {
      state.pokemonTypes = action.payload;
    });
  },
});

export { reducer, name, actions };
