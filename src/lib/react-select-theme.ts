import { StylesConfig } from 'react-select';

type OptionType = {
  value: string;
  label: string;
};

export type Variants = 'primary' | 'secondary';

export type VariantStyle = {
  control: {
    backgroundColor: string;
    boxShadow: string;
  };

  placeholder: {
    color: string;
  };

  input: {
    color: string;
  };

  singleValue: {
    color: string;
  };

  option: {
    backgroundColor: string;
    backgroundColorFocused: string;
    color: string;
  };

  menu: {
    backgroundColor: string;
  };

  multiValue: {
    backgroundColor: string;
  };

  multiValueLabel: {
    backgroundColor: string;
  };
};

const VARIANTS: { [key in Variants]: VariantStyle } = {
  // Dark-theme style
  primary: {
    control: {
      backgroundColor: '#374151',
      boxShadow: '#6366F1',
    },

    placeholder: {
      color: '#9CA3AF',
    },

    input: {
      color: '#E5E7EB',
    },

    singleValue: {
      color: '#E5E7EB',
    },

    option: {
      backgroundColor: 'transparent',
      backgroundColorFocused: '#4B5563',
      color: '#E5E7EB',
    },

    menu: {
      backgroundColor: '#374151',
    },

    multiValue: {
      backgroundColor: '#1F2937',
    },

    multiValueLabel: {
      backgroundColor: '#E5E7EB',
    },
  },

  // Light-theme style
  secondary: {
    control: {
      backgroundColor: '#F3F4F6',
      boxShadow: '#6366F1',
    },

    placeholder: {
      color: '#9CA3AF',
    },

    input: {
      color: '#111827',
    },

    singleValue: {
      color: '#111827',
    },

    option: {
      backgroundColor: 'transparent',
      backgroundColorFocused: '#E5E7EB',
      color: '#111827',
    },

    menu: {
      backgroundColor: '#F3F4F6',
    },

    multiValue: {
      backgroundColor: '#E5E7EB',
    },

    multiValueLabel: {
      backgroundColor: '#111827',
    },
  },
};

/**
 * Default style for the `react-select` component. Don't use this object for
 * `<Select isMulti={true} />`. Make sure to use colors from TailwindCSS color
 * palette.
 */
export const singleSelectStyle = (variant: Variants = 'primary'): StylesConfig<OptionType, false> => {
  const style = VARIANTS[variant];

  return {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      borderRadius: '0.375rem',
      backgroundColor: style.control.backgroundColor,
      boxShadow: state.isFocused ? `0 0 0 3px ${style.control.boxShadow}, 0 0 #0000` : '',
      transition: 'box-shadow 0.1s ease-in-out',
    }),

    placeholder: (provided) => ({
      ...provided,
      fontSize: '1.125rem',
      fontFamily: 'Inter',
      fontWeight: 500,
      lineHeight: '1.75rem',
      color: style.placeholder.color,
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
      color: style.input.color,
    }),

    singleValue: (provided) => ({
      ...provided,
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      color: style.singleValue.color,
    }),

    option: (provided, state) => ({
      ...provided,
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.25rem',
      backgroundColor: state.isFocused ? style.option.backgroundColorFocused : style.option.backgroundColor,
      color: style.option.color,
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: style.menu.backgroundColor,
    }),
  };
};

/**
 * Default style for the `react-select` component. Don't use this object for
 * `<Select isMulti={false} />`. Make sure to use colors from TailwindCSS color
 * palette.
 */
export const multiSelectStyle = (variant: Variants = 'primary'): StylesConfig<OptionType, true> => {
  const style = VARIANTS[variant];

  return {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      borderRadius: '0.375rem',
      backgroundColor: style.control.backgroundColor,
      boxShadow: state.isFocused ? `0 0 0 3px ${style.control.boxShadow}, 0 0 #0000` : '',
      transition: 'box-shadow 0.1s ease-in-out',
    }),

    placeholder: (provided) => ({
      ...provided,
      fontSize: '1.125rem',
      fontFamily: 'Inter',
      fontWeight: 500,
      lineHeight: '1.75rem',
      color: style.placeholder.color,
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
      color: style.input.color,
    }),

    singleValue: (provided) => ({
      ...provided,
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      color: style.singleValue.color,
    }),

    option: (provided, state) => ({
      ...provided,
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.25rem',
      backgroundColor: state.isFocused ? style.option.backgroundColorFocused : style.option.backgroundColor,
      color: style.option.color,
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: style.menu.backgroundColor,
    }),

    multiValue: (provided) => ({
      ...provided,
      backgroundColor: style.multiValue.backgroundColor,
    }),

    multiValueLabel: (provided) => ({
      ...provided,
      color: style.multiValueLabel.backgroundColor,
    }),
  };
};
