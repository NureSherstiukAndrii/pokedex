import { createAsyncThunk } from "@reduxjs/toolkit";

import { name } from "./slice";
import { API_URL } from "@/api/urls";
import { MainBackData, Pokemon, PokemonDetails, TypesList } from "@/types";
import { getPokemons } from "@/api/queries";

const loadPokemons = createAsyncThunk<Pokemon[], number>(
  `${name}/load-pokemons`,
  async (listLimit) => {
    const res = await fetch(`${API_URL}/pokemon/?limit=${listLimit}`);
    const data: MainBackData = await res.json();

    const pokemons = await getPokemons(data.results);

    return pokemons;
  }
);

const loadTypes = createAsyncThunk<string[]>(
  `${name}/load-filters`,
  async () => {
    const res = await fetch(`${API_URL}/type?limit=999`);

    const data: TypesList = await res.json();
    const types = data.results.map(({ name }) => name);

    return types;
  }
);

const loadPokemon = createAsyncThunk<PokemonDetails, number>(
  `${name}/load-pokemon`,
  async (id) => {
    const res = await fetch(`${API_URL}/pokemon/${id}`);

    const pokemon: PokemonDetails = await res.json();

    return pokemon;
  }
);

export { loadPokemons, loadTypes, loadPokemon };
