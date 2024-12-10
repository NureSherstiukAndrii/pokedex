import { useState } from "react";

import { PokemonList, PokemonWidget } from "./components";
import { PokemonDetails } from "./types";
import { getPokemon } from "./api/queries";

import "./styles/global.scss";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonDetails | undefined
  >(undefined);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  const handleChangeSelectedPokemon = async (id: number): Promise<void> => {
    const selectedPokemon = await getPokemon(id);
    setSelectedPokemon(selectedPokemon);
  };

  const handleWidgetOpen = () => {
    setIsWidgetVisible(true);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-wrapper__title">Pokedex</h1>
      <div className="main-wrapper">
        <PokemonList
          handleChangeSelectedPokemon={handleChangeSelectedPokemon}
          handleWidgetOpen={handleWidgetOpen}
        />
        {isWidgetVisible && <PokemonWidget selectedPokemon={selectedPokemon} />}
      </div>
    </div>
  );
};

export default App;
