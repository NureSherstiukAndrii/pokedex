import { animateScroll } from "react-scroll";

import { useAppDispatch } from "@/hooks";
import { PokemonTypes } from "@/types";
import { capitalizeFirstLetter } from "@/utils/formatters";
import { typeColors } from "@/utils/typeColors";
import { actions } from "@/store/pokemons/pokemonsSlice";

import "./index.scss";

interface PokemonCardProps {
  id: number;
  img: string;
  name: string;
  types: PokemonTypes[];
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  img,
  types,
}) => {
  const dispatch = useAppDispatch();

  const tabletBreakpoint = 768;
  const scrollOptions = {
    duration: 1000,
    smooth: true,
  };

  const handleCardClick = () => {
    dispatch(actions.setCurrentPokemonId(id));

    if (window.innerWidth < tabletBreakpoint) {
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
