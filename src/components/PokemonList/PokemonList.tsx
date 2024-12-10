import { useEffect, useState } from "react";

import { PokemonCard } from "./PokemonCard/PokemonCard";
import { MainBackData, Pokemon } from "@/types";
import { API_URL } from "@/api/urls";
import { getPokemons } from "@/api/queries";

import "./index.scss";

interface PokemonListProps {
  handleChangeSelectedPokemon: (id: number) => void;
  handleWidgetOpen: () => void;
}

export const PokemonList: React.FC<PokemonListProps> = ({
  handleChangeSelectedPokemon,
  handleWidgetOpen,
}) => {
  const [listLimit, setListLimit] = useState(12);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isListLoading, setIsListLoading] = useState(false);

  useEffect(() => {
    getPokemonsList();
  }, [listLimit]);

  const getPokemonsList = async (): Promise<void> => {
    setIsListLoading(true);
    try {
      const res = await fetch(`${API_URL}/pokemon/?limit=${listLimit}`);
      const data: MainBackData = await res.json();

      const currentPokemons = await getPokemons(data.results);

      setPokemons(currentPokemons);
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    } finally {
      setIsListLoading(false);
    }
  };

  const handleAddLimit = () => {
    if (!isListLoading) {
      setListLimit((prev) => prev + 12);
    }
  };

  return (
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
        onClick={handleAddLimit}
        className="load-more"
        disabled={isListLoading}
      >
        {isListLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};
