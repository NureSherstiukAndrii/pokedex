import {
  PokemonList,
  PokemonWidget,
  PokemonFilters,
  ArrowToTop,
} from "./components";

import "./styles/global.scss";

const App = () => {
  return (
    <div className="page-wrapper">
      <ArrowToTop />
      <h1 className="page-wrapper__title">Pokedex</h1>
      <PokemonFilters />
      <div className="main-wrapper">
        <PokemonList />
        <PokemonWidget />
      </div>
    </div>
  );
};

export default App;
