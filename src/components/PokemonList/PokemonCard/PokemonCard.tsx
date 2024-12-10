import { PokemonTypes } from "@/types";
import { capitalizeFirstLetter } from "@/utils/formatters";
import { typeColors } from "@/utils/typeColors";

import "./index.scss";

interface PokemonCardProps {
  id: number;
  handleChangeSelectedPokemon: (id: number) => void;
  img: string;
  name: string;
  types: PokemonTypes[];
  handleWidgetOpen: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  handleChangeSelectedPokemon,
  img,
  types,
  handleWidgetOpen,
}) => {
  const handleCardClick = () => {
    handleChangeSelectedPokemon(id);
    handleWidgetOpen();
  };

  return (
    <div className="pokemon-item" onClick={handleCardClick}>
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
