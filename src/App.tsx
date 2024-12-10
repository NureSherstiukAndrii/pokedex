import { useState } from "react";

import {
  PokemonList,
  PokemonWidget,
  PokemonFilters,
  ArrowToTop,
} from "./components";
import { Pokemon, PokemonDetails, PokemonTypes } from "./types";
import { getPokemon } from "./api/queries";

import "./styles/global.scss";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonDetails | undefined
  >(undefined);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [isWidgetLoading, setIsWidgetLoading] = useState(false);
  const [filterList, setFilterList] = useState<string[] | undefined>();
  const [appliedFilters, setAppliedFilters] = useState<string[] | undefined>();

  const handleChangeSelectedPokemon = async (id: number): Promise<void> => {
    try {
      const selectedPokemon = await getPokemon(id);

      setIsWidgetLoading(true);
      setSelectedPokemon(selectedPokemon);
      setIsWidgetLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWidgetOpen = () => {
    setIsWidgetVisible(true);
  };

  const getFilters = (currentPokemons: Pokemon[]) => {
    const pokemonTypes: Array<PokemonTypes[]> = currentPokemons.map(
      ({ types }) => types
    );

    const allTypes = pokemonTypes.map((elem) =>
      elem.map(({ type }) => type.name)
    );

    const allFlattenedTypes = allTypes.flat();
    const finishFilters = [...new Set(allFlattenedTypes)];

    setFilterList(finishFilters);
  };

  const handleChangeFilters = (filters: string[]) => {
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    setAppliedFilters(undefined);
  };

  return (
    <div className="page-wrapper">
      <ArrowToTop />
      <h1 className="page-wrapper__title">Pokedex</h1>
      <PokemonFilters
        filters={filterList}
        onApplyFilters={handleChangeFilters}
        resetFilters={resetFilters}
      />
      <div className="main-wrapper">
        <PokemonList
          handleChangeSelectedPokemon={handleChangeSelectedPokemon}
          handleWidgetOpen={handleWidgetOpen}
          getFilters={getFilters}
          appliedFilters={appliedFilters}
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
