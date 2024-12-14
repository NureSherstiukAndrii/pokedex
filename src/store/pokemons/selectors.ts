import { State } from "./slice";

interface PokemonsState {
  pokemons: State;
}

export const selectFilteredPokemons = ({ pokemons }: PokemonsState) => {
  const { pokemons: initPokemons, selectedFilters } = pokemons;

  if (selectedFilters.length > 0) {
    return initPokemons.filter((pokemon) =>
      pokemon.types.some((type) => selectedFilters.includes(type.type.name))
    );
  }

  return initPokemons;
};

export const selectSelectedFilters = ({ pokemons }: PokemonsState) =>
  pokemons.selectedFilters;

export const selectListStatus = ({ pokemons }: PokemonsState) =>
  pokemons.listStatus;

export const selectCurrentPokemon = ({ pokemons }: PokemonsState) => {
  const { currentPokemonId } = pokemons;

  return pokemons.pokemons.find(({ id }) => id === currentPokemonId);
};

export const selectPokemonTypes = ({ pokemons }: PokemonsState) =>
  pokemons.pokemonTypes;
