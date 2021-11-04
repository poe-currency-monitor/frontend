import React from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';

import { Variants, singleSelectStyle } from '../../lib/react-select-theme';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = ReactSelectProps<SelectOption, false> & {
  variant?: Variants;
};

/**
 * Wrapper around the `react-select` component with a default style.
 *
 * Should be used for single values only (`isMulti=false`).
 *
 * @param props React-Select props.
 */
export const Select: React.FC<SelectProps> = ({ variant, ...props }) => {
  return <ReactSelect {...props} styles={singleSelectStyle(variant)} isMulti={false} />;
};
