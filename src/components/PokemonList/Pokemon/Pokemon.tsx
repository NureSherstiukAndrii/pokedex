import "./index.scss";

interface PokemonProps {
  // img: string;
  name: string;
  // types: string[];
}

export const Pokemon: React.FC<PokemonProps> = ({ name }) => {
  return (
    <div className="pokemon-item">
      <img src="" className="pokemon-item__image" alt="pokemon" />
      <span className="pokemon-item__name">{name}</span>
      <div className="pokemon-item__types">type</div>
    </div>
  );
};
