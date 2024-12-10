import { Loader } from "../Loader/Loader";
import { PokemonDetails } from "@/types";
import {
  capitalizeFirstLetter,
  addZerosToNum,
  formatStatName,
} from "@/utils/formatters";

import "./index.scss";

interface PokemonWidgetProps {
  selectedPokemon: PokemonDetails | undefined;
  isLoading: boolean;
}

export const PokemonWidget: React.FC<PokemonWidgetProps> = ({
  selectedPokemon,
  isLoading,
}) => {
  if (!selectedPokemon) {
    return <Loader />;
  }

  return (
    <div className="pokemon-widget">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img
            src={selectedPokemon.sprites.front_default}
            className="pokemon-widget__image"
            alt={`${selectedPokemon.name}`}
          />
          <h2 className="pokemon-widget__title">
            {capitalizeFirstLetter(selectedPokemon.name)} #
            {addZerosToNum(selectedPokemon.order)}
          </h2>
          <table className="pokemon-stats">
            <tr>
              <td>Type</td>
              <td className="pokemon-types">
                {selectedPokemon.types.map(({ type }) => (
                  <span key={type.name}>
                    {capitalizeFirstLetter(type.name)}
                  </span>
                ))}
              </td>
            </tr>
            {selectedPokemon.stats.map(({ stat, base_stat }) => (
              <tr key={stat.name}>
                <td>{capitalizeFirstLetter(formatStatName(stat.name))}</td>
                <td>{base_stat}</td>
              </tr>
            ))}
            <tr>
              <td>Weight</td>
              <td>{selectedPokemon.weight}</td>
            </tr>
            <tr>
              <td>Total moves</td>
              <td>{selectedPokemon.moves.length}</td>
            </tr>
          </table>
        </>
      )}
    </div>
  );
};
