import { Field, Form } from "react-final-form";

import "./index.scss";
import { capitalizeFirstLetter } from "@/utils/formatters";

interface PokemonFiltersProps {
  filters: string[] | undefined;
  onApplyFilters: (selectedFilters: string[]) => void;
}

interface FormData {
  filters: string[];
}

export const PokemonFilters: React.FC<PokemonFiltersProps> = ({
  filters,
  onApplyFilters,
}) => {
  const onSubmit = (values: FormData) => {
    onApplyFilters(values.filters);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
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
        </form>
      )}
    />
  );
};
