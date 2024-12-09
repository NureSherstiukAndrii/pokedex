import { useEffect, useState } from "react";

import { Pokemon } from "./Pokemon/Pokemon";
import { MainBackData, PokemonsList } from "../../types";
import { API_URL } from "../../api/urls";

import "./index.scss";

interface PokemonTypesDetail {
  name: string;
  url: string;
}

interface PokemonTypes {
  slot: number;
  type: PokemonTypesDetail;
}

interface PokemonImage {
  front_default: string;
}

interface PokemonItem {
  name: string;
  types: PokemonTypes[];
  sprites: PokemonImage;
}

export const PokemonList = () => {
  const [listLimit, setListLimit] = useState(12);
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);

  console.log("listLimit", listLimit);

  useEffect(() => {
    getPokemonsList();
  }, [listLimit]);

  const getPokemonsList = async (): Promise<void> => {
    const res = await fetch(`${API_URL}/pokemon/?limit=${listLimit}`);
    const data: MainBackData = await res.json();

    const currentPokemons = await getPokemons(data.results);

    setPokemons(currentPokemons);
  };

  const getPokemons = async (arr: PokemonsList[]): Promise<PokemonItem[]> => {
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
          <Pokemon
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
