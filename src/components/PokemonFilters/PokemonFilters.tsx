import { Field, Form } from "react-final-form";

import "./index.scss";

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
        <form className="filters" onSubmit={handleSubmit}>
          {filters !== undefined &&
            filters.map((filter) => (
              <div key={filter}>
                <Field
                  name="filters"
                  component="input"
                  type="checkbox"
                  value={filter}
                />
                <span>{filter}</span>
              </div>
            ))}

          <button type="submit">Apply filters</button>
        </form>
      )}
    />
  );
};
