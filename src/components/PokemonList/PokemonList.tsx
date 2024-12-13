import { FC, useEffect, useState } from "react";
import { loadPokemons } from "@/store/pokemons/actions";

import { useAppSelector, useAppDispatch } from "@/hooks";
import { PokemonCard } from "./PokemonCard/PokemonCard";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";
import { Loader } from "../Loader/Loader";

import "./index.scss";

interface PokemonListProps {
  handleChangeSelectedPokemon: (id: number) => void;
  handleWidgetOpen: () => void;
}

export const PokemonList: FC<PokemonListProps> = ({
  handleChangeSelectedPokemon,
  handleWidgetOpen,
}) => {
  const [listLimit, setListLimit] = useState(12);
  // const [isListLoading, setIsListLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemons.filteredPokemons);
  const selectedFilters = useAppSelector(
    (state) => state.pokemons.selectedFilters
  );

  useEffect(() => {
    dispatch(loadPokemons(listLimit));
  }, [listLimit]);

  const handleAddLimit = () => {
    setListLimit((prev) => prev + 12);
  };

  const handleModalView = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleLoadMore = () => {
    if (selectedFilters.length === 0) {
      handleAddLimit();
    } else {
      handleModalView();
    }
  };

  if (pokemons.length === 0) {
    return <Loader />;
  }

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

        <button onClick={handleLoadMore} className="load-more">
          Load More
        </button>
      </div>
    </>
  );
};
