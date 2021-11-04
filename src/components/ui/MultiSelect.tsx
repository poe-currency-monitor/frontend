import React from 'react';
import ReactSelect, { Props as ReactSelectProps, MultiValue } from 'react-select';

import { Variants, multiSelectStyle } from '../../lib/react-select-theme';

export type MultiSelectOption = {
  label: string;
  value: string;
};

export type MultiSelectOptions = MultiValue<MultiSelectOption>;

export type MultiSelectProps = ReactSelectProps<MultiSelectOption, true> & {
  variant?: Variants;
};

/**
 * Wrapper around the `react-select` component with a default style.
 * Should be used for multiple values only (`isMulti=true`).
 *
 * @param props React-Select props.
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({ variant = 'primary', ...props }) => {
  return <ReactSelect {...props} styles={multiSelectStyle(variant)} isMulti />;
};
