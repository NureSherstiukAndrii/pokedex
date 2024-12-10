import { FC, useEffect, useState } from "react";

import { PokemonCard } from "./PokemonCard/PokemonCard";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";
import { MainBackData, Pokemon } from "@/types";
import { API_URL } from "@/api/urls";
import { getPokemons } from "@/api/queries";

import "./index.scss";

interface PokemonListProps {
  handleChangeSelectedPokemon: (id: number) => void;
  handleWidgetOpen: () => void;
  getFilters: (currentPokemons: Pokemon[]) => void;
  appliedFilters: string[] | undefined;
}

export const PokemonList: FC<PokemonListProps> = ({
  handleChangeSelectedPokemon,
  handleWidgetOpen,
  getFilters,
  appliedFilters,
}) => {
  const [listLimit, setListLimit] = useState(12);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getPokemonsList();
  }, [listLimit, appliedFilters]);

  const filterPokemons = (
    pokemons: Pokemon[],
    filters: string[]
  ): Pokemon[] => {
    return pokemons.filter((pokemon) => {
      const { types } = pokemon;
      const pokemonTypes = types.map((elem) => elem.type.name);

      return pokemonTypes.some((type) => filters.includes(type));
    });
  };

  const getPokemonsList = async (): Promise<void> => {
    setIsListLoading(true);
    try {
      const res = await fetch(`${API_URL}/pokemon/?limit=${listLimit}`);
      const data: MainBackData = await res.json();

      const initialPokemons = await getPokemons(data.results);

      let filteredList = [...initialPokemons];

      if (appliedFilters !== undefined && appliedFilters.length > 0) {
        filteredList = filterPokemons(initialPokemons, appliedFilters);
      }

      setPokemons(filteredList);
      getFilters(initialPokemons);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    } finally {
      setIsListLoading(false);
    }
  };

  const handleAddLimit = () => {
    if (!isListLoading) {
      setListLimit((prev) => prev + 12);
    }
  };

  const handleModalView = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleLoadMore = () => {
    if (appliedFilters === undefined) {
      handleAddLimit();
    } else {
      handleModalView();
    }
  };

  return (
    <>
      {isModalVisible && (
        <ConfirmModal
          handleAddLimit={handleAddLimit}
          handleModalView={handleModalView}
        />
      )}
      <div className="pokemons-list">
        <div className="pokemons-list__pokemons">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              handleChangeSelectedPokemon={handleChangeSelectedPokemon}
              handleWidgetOpen={handleWidgetOpen}
              name={pokemon.name}
              img={pokemon.sprites.front_default}
              types={pokemon.types}
            />
          ))}
        </div>

        <button
          onClick={handleLoadMore}
          className="load-more"
          disabled={isListLoading}
        >
          {isListLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </>
  );
};
