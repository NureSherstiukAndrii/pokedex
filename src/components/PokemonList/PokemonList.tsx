import { useEffect, useState } from "react";

import { PokemonCard } from "./PokemonCard/PokemonCard";
import { MainBackData, PokemonsList, Pokemon } from "../../types";
import { API_URL } from "../../api/urls";

import "./index.scss";

interface PokemonListProps {
  handleChangeSelectedPokemon: (id: number) => void;
}

export const PokemonList: React.FC<PokemonListProps> = ({
  handleChangeSelectedPokemon,
}) => {
  const [listLimit, setListLimit] = useState(12);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemonsList();
  }, [listLimit]);

  const getPokemonsList = async (): Promise<void> => {
    const res = await fetch(`${API_URL}/pokemon/?limit=${listLimit}`);
    const data: MainBackData = await res.json();

    const currentPokemons = await getPokemons(data.results);

    setPokemons(currentPokemons);
  };

  const getPokemons = async (arr: PokemonsList[]): Promise<Pokemon[]> => {
    const newArr = await Promise.all(
      arr.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const pokemonWithDetails = await res.json();
        return pokemonWithDetails;
      })
    );

    return newArr;
  };

  const handleAddLimit = () => {
    setListLimit((prev) => prev + 12);
  };

  return (
    <div className="pokemons-list">
      <div className="pokemons-list__pokemons">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            handleChangeSelectedPokemon={handleChangeSelectedPokemon}
            name={pokemon.name}
            img={pokemon.sprites.front_default}
            types={pokemon.types}
          />
        ))}
      </div>

      <button onClick={handleAddLimit} className="load-more">
        Load More
      </button>
    </div>
  );
};
