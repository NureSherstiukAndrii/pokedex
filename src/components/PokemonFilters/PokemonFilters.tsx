import { useEffect } from "react";
import { Field, Form } from "react-final-form";

import { useAppSelector, useAppDispatch } from "@/hooks";
import { capitalizeFirstLetter } from "@/utils/formatters";
import { actions } from "@/store/pokemons/pokemonsSlice";
import { selectPokemonTypes } from "@/store/pokemons/selectors";

import "./index.scss";

interface FormData {
  filters: string[];
}

export const PokemonFilters = () => {
  const dispatch = useAppDispatch();
  const pokemonTypes = useAppSelector(selectPokemonTypes);

  useEffect(() => {
    dispatch(actions.loadTypes());
  }, []);

  const onSubmit = (values: FormData): void => {
    if (!values.filters || values.filters.length === 0) {
      dispatch(actions.clearFilters());
    } else {
      dispatch(actions.setFilters(values.filters));
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => (
        <form className="filters-form" onSubmit={handleSubmit}>
          <span className="filters-form__title">Filter by type</span>

          <div className="filters-form__types">
            {pokemonTypes !== undefined &&
              pokemonTypes.map((filter) => (
                <div key={filter} className="filters-type">
                  <Field
                    name="filters"
                    className="filters-type__checkbox "
                    component="input"
                    type="checkbox"
                    value={filter}
                  />
                  <span>{capitalizeFirstLetter(filter)}</span>
                </div>
              ))}
          </div>

          <button type="submit" className="filters-form__submit">
            Apply filters
          </button>

          <button
            type="button"
            onClick={() => {
              dispatch(actions.clearFilters());
              form.reset();
            }}
            className="filters-form__reset"
          >
            Reset filters
          </button>
        </form>
      )}
    />
  );
};
