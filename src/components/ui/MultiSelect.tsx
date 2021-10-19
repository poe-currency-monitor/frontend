import React from 'react';
import ReactSelect, { Props as ReactSelectProps, MultiValue } from 'react-select';

import { multiSelectStyle } from '../../react-select-theme';

export type MultiSelectOption = {
  label: string;
  value: string;
};

export type MultiSelectOptions = MultiValue<MultiSelectOption>;

export type MultiSelectProps = ReactSelectProps<MultiSelectOption, true>;

/**
 * Wrapper around the `react-select` component with a default style.
 * Should be used for multiple values only (`isMulti=true`).
 *
 * @param props React-Select props.
 */
export const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  return <ReactSelect {...props} styles={multiSelectStyle} isMulti />;
};
