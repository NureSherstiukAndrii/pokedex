import { Loader } from "../Loader/Loader";
import { useAppSelector } from "@/hooks";
import {
  capitalizeFirstLetter,
  addZerosToNum,
  formatStatName,
} from "@/utils/formatters";
import { DataStatus } from "@/enums/DataStatus";

import "./index.scss";

export const PokemonWidget = () => {
  const pokemon = useAppSelector((state) => state.pokemons.selectedPokemon);
  const selectedPokemonStatus = useAppSelector(
    (state) => state.pokemons.selectedPokemonStatus
  );

  if (selectedPokemonStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="pokemon-widget">
      <img
        src={pokemon.sprites.front_default}
        className="pokemon-widget__image"
        alt={`${pokemon.name}`}
      />
      <h2 className="pokemon-widget__title">
        {capitalizeFirstLetter(pokemon.name)} #{addZerosToNum(pokemon.order)}
      </h2>
      <table className="pokemon-stats">
        <tbody>
          <tr>
            <td>Type</td>
            <td className="pokemon-types">
              {pokemon.types.map(({ type }) => (
                <span key={type.name}>{capitalizeFirstLetter(type.name)}</span>
              ))}
            </td>
          </tr>
          {pokemon.stats.map(({ stat, base_stat }) => (
            <tr key={stat.name}>
              <td>{capitalizeFirstLetter(formatStatName(stat.name))}</td>
              <td>{base_stat}</td>
            </tr>
          ))}
          <tr>
            <td>Weight</td>
            <td>{pokemon.weight}</td>
          </tr>
          <tr>
            <td>Total moves</td>
            <td>{pokemon.moves.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
