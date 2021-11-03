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
    backgroundColor: '#374151',
    boxShadow: state.isFocused ? '0 0 0 3px #6366F1, 0 0 #0000' : '',
    transition: 'box-shadow 0.1s ease-in-out',
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: '1.125rem',
    fontFamily: 'Inter',
    fontWeight: 500,
    lineHeight: '1.75rem',
    color: '#94A3B8',
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: '0.25rem 1rem',
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
    color: '#E5E7EB',
  }),

  singleValue: (provided) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    color: '#E5E7EB',
  }),

  option: (provided, state) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.25rem',
    backgroundColor: state.isFocused ? '#4B5563' : 'transparent',
    color: state.isSelected ? '#E5E7EB' : '#E5E7EB',
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151',
  }),
};

/**
 * Default style for the `react-select` component. Don't use this object for
 * `<Select isMulti={false} />`. Make sure to use colors from TailwindCSS color
 * palette.
 */
export const multiSelectStyle: StylesConfig<OptionType, true> = {
  control: (provided, state) => ({
    ...provided,
    border: 'none',
    borderRadius: '0.375rem',
    backgroundColor: '#374151',
    boxShadow: state.isFocused ? '0 0 0 3px #6366F1, 0 0 #0000' : '',
    transition: 'box-shadow 0.1s ease-in-out',
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: '1.125rem',
    fontFamily: 'Inter',
    fontWeight: 500,
    lineHeight: '1.75rem',
    color: '#9CA3AF',
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: '0.25rem 1rem',
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
    color: '#E5E7EB',
  }),

  singleValue: (provided) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    color: '#E5E7EB',
  }),

  option: (provided, state) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.25rem',
    backgroundColor: state.isFocused ? '#4B5563' : 'transparent',
    color: '#E5E7EB',
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151',
  }),

  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#1F2937',
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: '#E5E7EB',
  }),
};
