import { useState } from "react";
import { PokemonList, PokemonWidget } from "./components";
import { PokemonDetails } from "./types";

import "./styles/global.scss";
import { API_URL } from "./api/urls";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonDetails | undefined
  >(undefined);

  const getPokemon = async (
    id: number
  ): Promise<PokemonDetails | undefined> => {
    try {
      const res = await fetch(`${API_URL}/pokemon/${id}`);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeSelectedPokemon = async (id: number): Promise<void> => {
    const selectedPokemon = await getPokemon(id);
    setSelectedPokemon(selectedPokemon);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-wrapper__title">Pokedex</h1>
      <div className="main-wrapper">
        <PokemonList
          handleChangeSelectedPokemon={handleChangeSelectedPokemon}
        />
        <PokemonWidget selectedPokemon={selectedPokemon} />
      </div>
    </div>
  );
};

export default App;
