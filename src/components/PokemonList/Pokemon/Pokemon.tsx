import "./index.scss";

interface PokemonTypesDetail {
  name: string;
  url: string;
}
interface PokemonTypes {
  slot: number;
  type: PokemonTypesDetail;
}

interface PokemonProps {
  img: string;
  name: string;
  types: PokemonTypes[];
}

export const Pokemon: React.FC<PokemonProps> = ({ name, img, types }) => {
  return (
    <div className="pokemon-item">
      <img src={img} className="pokemon-item__image" alt="pokemon" />
      <span className="pokemon-item__name">{name}</span>
      <div className="pokemon-item__types">
        {types.map(({ type }) => (
          <span
            key={type.name}
            style={{ color: type.name }}
            className="pokemon-type"
          >
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
};
