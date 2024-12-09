import { PokemonTypes } from "../../../types";
import { capitalizeFirstLetter } from "../../../utils/formatters/capitalizeFirstLetter";
import { typeColors } from "../../../utils/typeColors";

import "./index.scss";

interface PokemonCardProps {
  id: number;
  handleChangeSelectedPokemon: (id: number) => void;
  img: string;
  name: string;
  types: PokemonTypes[];
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  handleChangeSelectedPokemon,
  img,
  types,
}) => {
  return (
    <div
      className="pokemon-item"
      onClick={() => handleChangeSelectedPokemon(id)}
    >
      <img src={img} className="pokemon-item__image" alt="pokemon" />
      <span className="pokemon-item__name">{capitalizeFirstLetter(name)}</span>
      <div className="pokemon-item__types">
        {types.map(({ type }) => (
          <span
            key={type.name}
            style={{ backgroundColor: typeColors[type.name] }}
            className="pokemon-type"
          >
            {capitalizeFirstLetter(type.name)}
          </span>
        ))}
      </div>
    </div>
  );
};
