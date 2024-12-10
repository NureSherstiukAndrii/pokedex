import { PokemonDetails, PokemonStats } from "@/types";
import { capitalizeFirstLetter, addZerosToNum } from "@/utils/formatters";

import "./index.scss";

interface PokemonWidgetProps {
  selectedPokemon: PokemonDetails | undefined;
}

export const PokemonWidget: React.FC<PokemonWidgetProps> = ({
  selectedPokemon,
}) => {
  const formatStat = (statistic: PokemonStats) => {
    const { base_stat, stat } = statistic;
    const statName = stat.name;

    return (
      <>
        <span>{capitalizeFirstLetter(statName)}</span>
        <span>{base_stat}</span>
      </>
    );
  };

  if (!selectedPokemon) {
    return <div>Info not found about this pokemon</div>;
  }

  return (
    <div className="pokemon-widget">
      <img
        src={selectedPokemon.sprites.front_default}
        className="pokemon-widget__image"
        alt={`${selectedPokemon.name}`}
      />
      <h2 className="pokemon-widget__title">
        {capitalizeFirstLetter(selectedPokemon.name)} #
        {addZerosToNum(selectedPokemon.order)}
      </h2>
      <div className="pokemon-stats">
        <div className="pokemon-stat">
          <span>Type</span>
          <div>
            {selectedPokemon.types.map(({ type }) => (
              <span key={type.name}>{capitalizeFirstLetter(type.name)}</span>
            ))}
          </div>
        </div>

        {selectedPokemon.stats.map((stat) => (
          <div className="pokemon-stat" key={stat.stat.name}>
            {formatStat(stat)}
          </div>
        ))}
        <div className="pokemon-stat">
          <span>Weight</span>
          <span>{selectedPokemon.weight}</span>
        </div>
        <div className="pokemon-stat">
          <span>Total moves</span>
          <span>{selectedPokemon.moves.length}</span>
        </div>
      </div>
    </div>
  );
};
