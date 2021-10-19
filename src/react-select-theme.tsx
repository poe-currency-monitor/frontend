import { StylesConfig } from 'react-select';

type OptionType = {
  value: string;
  label: string;
};

/**
 * Default style for the `react-select` component. Don't use this object for
 * `<Select isMulti={true} />`. Make sure to use colors from TailwindCSS color
 * palette.
 */
export const singleSelectStyle: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    border: 'none',
    borderRadius: '0.375rem',
    boxShadow: state.isFocused ? '0 0 0 3px #3c82f6, 0 0 #0000' : '',
    transition: 'box-shadow 0.1s ease-in-out',
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: '1.125rem',
    fontFamily: 'Inter',
    fontWeight: 500,
    lineHeight: '1.75rem',
    color: '#a1a1aa',
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: '0.5rem 1rem',
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),

  input: (provided) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    color: '#1a1a1d',
  }),

  singleValue: (provided) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    color: '#1a1a1d',
  }),

  option: (provided, state) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.25rem',
    color: state.isSelected ? '#f1f5f9' : '#1a1a1d',
  }),
};
