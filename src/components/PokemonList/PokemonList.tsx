import { useEffect, useState } from "react";

import { loadPokemons } from "@/store/pokemons/actions";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { PokemonCard } from "./PokemonCard/PokemonCard";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";
import { Loader } from "../Loader/Loader";
import {
  selectFilteredPokemons,
  selectSelectedFilters,
  selectListStatus,
} from "@/store/pokemons/selectors";

import { DataStatus } from "@/enums/DataStatus";

import "./index.scss";

export const PokemonList = () => {
  const [listLimit, setListLimit] = useState(12);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredPokemons = useAppSelector(selectFilteredPokemons);
  const selectedFilters = useAppSelector(selectSelectedFilters);
  const status = useAppSelector(selectListStatus);

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

  if (status === DataStatus.PENDING && filteredPokemons.length === 0) {
    return <Loader />;
  }

  return (
    <>
      {isModalVisible && (
        <ConfirmModal
          listLimit={listLimit}
          handleAddLimit={handleAddLimit}
          handleModalView={handleModalView}
        />
      )}

      <div className="pokemons-list">
        <div className="pokemons-list__pokemons">
          {filteredPokemons.length === 0 && <span>Pokemons not found</span>}
          {filteredPokemons.map((pokemon) => (
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

        {status === DataStatus.PENDING && filteredPokemons.length > 0 && (
          <Loader />
        )}
      </div>
    </>
  );
};
