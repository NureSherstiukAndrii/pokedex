import { useEffect, useState } from "react";

import { loadPokemons } from "@/store/pokemons/actions";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { PokemonCard } from "./PokemonCard/PokemonCard";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";
import { Loader } from "../Loader/Loader";
import { DataStatus } from "@/enums/DataStatus";

import "./index.scss";

export const PokemonList = () => {
  const [listLimit, setListLimit] = useState(12);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pokemons = useAppSelector((state) => state.pokemons.filteredPokemons);
  const selectedFilters = useAppSelector(
    (state) => state.pokemons.selectedFilters
  );
  const status = useAppSelector((state) => state.pokemons.listStatus);
  const dispatch = useAppDispatch();

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

  if (status === DataStatus.PENDING && pokemons.length === 0) {
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
              name={pokemon.name}
              img={pokemon.sprites.front_default}
              types={pokemon.types}
            />
          ))}
        </div>

        {status === DataStatus.SUCCESS && (
          <button onClick={handleLoadMore} className="load-more">
            Load More
          </button>
        )}

        {status === DataStatus.PENDING && pokemons.length > 0 && <Loader />}
      </div>
    </>
  );
};
