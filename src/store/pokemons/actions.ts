import { createAsyncThunk } from "@reduxjs/toolkit";

import { name } from "./slice";
import { API_URL } from "@/api/urls";
import { MainBackData, PokemonDetails, TypesList } from "@/types";
import { getPokemons } from "@/api/queries";

const loadPokemons = createAsyncThunk<PokemonDetails[], number>(
  `${name}/load-pokemons`,
  async (limit) => {
    const res = await fetch(`${API_URL}/pokemon/?offset=${limit}&limit=12`);
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

export { loadPokemons, loadTypes };
