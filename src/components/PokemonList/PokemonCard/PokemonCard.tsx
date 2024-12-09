import { PokemonTypes } from "../../../types";
import { capitalizeFirstLetter } from "../../../utils/formatters/capitalizeFirstLetter";
import { typeColors } from "../../../utils/typeColors";

import "./index.scss";

interface PokemonProps {
  id: number;
  img: string;
  name: string;
  types: PokemonTypes[];
}

export const PokemonCard: React.FC<PokemonProps> = ({ name, img, types }) => {
  return (
    <div className="pokemon-item">
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
