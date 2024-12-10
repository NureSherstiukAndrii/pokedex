import { animateScroll } from "react-scroll";

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
  const scrollOptions = {
    duration: 1000,
    smooth: true,
  };

  const handleCardClick = () => {
    handleChangeSelectedPokemon(id);
    handleWidgetOpen();

    if (window.innerWidth < 768) {
      animateScroll.scrollToTop(scrollOptions);
    }
  };

  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      <img src={img} className="pokemon-card__image" alt="pokemon" />
      <span className="pokemon-card__name">{capitalizeFirstLetter(name)}</span>
      <div className="pokemon-card__types">
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
