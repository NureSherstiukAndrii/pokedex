import { PokemonList, PokemonWidget } from "./components";

import "./styles/global.scss";

const App = () => {
  return (
    <div className="page-wrapper">
      <h1 className="page-wrapper__title">Pokedex</h1>
      <div className="main-wrapper">
        <PokemonList />
        <PokemonWidget />
      </div>
    </div>
  );
};

export default App;
