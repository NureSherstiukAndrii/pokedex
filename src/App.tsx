import { useState } from "react";

import {
  PokemonList,
  PokemonWidget,
  PokemonFilters,
  ArrowToTop,
} from "./components";
import { PokemonDetails } from "./types";
import { getPokemon } from "./api/queries";

import "./styles/global.scss";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonDetails | undefined
  >(undefined);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [isWidgetLoading, setIsWidgetLoading] = useState(false);

  const handleChangeSelectedPokemon = async (id: number): Promise<void> => {
    setIsWidgetLoading(true);

    try {
      const selectedPokemon = await getPokemon(id);
      setSelectedPokemon(selectedPokemon);
    } catch (error) {
      console.log(error);
    } finally {
      setIsWidgetLoading(false);
    }
  };

  const handleWidgetOpen = () => {
    setIsWidgetVisible(true);
  };

  return (
    <div className="page-wrapper">
      <ArrowToTop />
      <h1 className="page-wrapper__title">Pokedex</h1>
      <PokemonFilters />
      <div className="main-wrapper">
        <PokemonList
          handleChangeSelectedPokemon={handleChangeSelectedPokemon}
          handleWidgetOpen={handleWidgetOpen}
        />
        {isWidgetVisible && (
          <PokemonWidget
            isLoading={isWidgetLoading}
            selectedPokemon={selectedPokemon}
          />
        )}
      </div>
    </div>
  );
};

export default App;