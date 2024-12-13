import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadPokemon, loadPokemons, loadTypes } from "./actions";
import { Pokemon, PokemonDetails } from "@/types";
import { DataStatus } from "@/enums/DataStatus";

type State = {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  selectedPokemon: PokemonDetails | null;
  pokemonTypes: string[];
  selectedFilters: string[];
  listStatus: DataStatus;
  selectedPokemonStatus: DataStatus;
};

const initialState: State = {
  pokemons: [],
  filteredPokemons: [],
  selectedPokemon: null,
  pokemonTypes: [],
  selectedFilters: [],
  listStatus: DataStatus.IDLE,
  selectedPokemonStatus: DataStatus.IDLE,
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
    builder.addCase(loadPokemons.pending, (state) => {
      state.listStatus = DataStatus.PENDING;
    });
    builder.addCase(loadPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload;
      state.filteredPokemons = action.payload;
      state.listStatus = DataStatus.SUCCESS;
    });
    builder.addCase(loadTypes.fulfilled, (state, action) => {
      state.pokemonTypes = action.payload;
    });
    builder.addCase(loadPokemon.pending, (state) => {
      state.selectedPokemonStatus = DataStatus.PENDING;
    });
    builder.addCase(loadPokemon.fulfilled, (state, action) => {
      state.selectedPokemon = action.payload;
      state.selectedPokemonStatus = DataStatus.SUCCESS;
    });
  },
});

export { reducer, name, actions };
