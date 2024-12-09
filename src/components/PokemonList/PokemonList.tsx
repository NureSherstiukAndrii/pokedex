import { useEffect, useState } from "react";

import { Pokemon } from "./Pokemon/Pokemon";
import { MainBackData, PokemonsList } from "../../types";

import "./index.scss";

export const PokemonList = () => {
  const [listLimit, setListLimit] = useState(12);
  const [pokemons, setPokemons] = useState<PokemonsList[]>([]);

  console.log("listLimit", listLimit);

  useEffect(() => {
    getPokemons();
  }, [listLimit]);

  const getPokemons = async (): Promise<void> => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${listLimit}`
    );

    const data: MainBackData = await res.json();

    setPokemons(data.results);
  };

  const handleAddLimit = () => {
    setListLimit((prev) => prev + 12);
  };

  return (
    <div className="pokemons-list">
      <h1>Pokedex</h1>
      <div className="pokemons-list__pokemons">
        {pokemons.map(({ name }) => (
          <Pokemon name={name} />
        ))}
      </div>

      <button onClick={handleAddLimit}>Load More</button>
    </div>
  );
};
