import { createAsyncThunk } from "@reduxjs/toolkit";

import { name } from "./slice";
import { API_URL } from "@/api/urls";
import { MainBackData, Pokemon } from "@/types";
import { getPokemons } from "@/api/queries";
import { Types } from "@/types/Types";

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

    const data: Types = await res.json();
    const types = data.results.map(({ name }) => name);

    return types;
  }
);

export { loadPokemons, loadTypes };