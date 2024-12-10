import { Field, Form } from "react-final-form";

import { capitalizeFirstLetter } from "@/utils/formatters";

import "./index.scss";

interface PokemonFiltersProps {
  filters: string[] | undefined;
  onApplyFilters: (selectedFilters: string[]) => void;
  resetFilters: () => void;
}

interface FormData {
  filters: string[];
}

export const PokemonFilters: React.FC<PokemonFiltersProps> = ({
  filters,
  onApplyFilters,
  resetFilters,
}) => {
  const onSubmit = (values: FormData): void => {
    onApplyFilters(values.filters);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => (
        <form className="filters-form" onSubmit={handleSubmit}>
          <span className="filters-form__title">Filter by type</span>

          <div className="filters-form__types">
            {filters !== undefined &&
              filters.map((filter) => (
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
            onClick={() => {
              resetFilters();
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
