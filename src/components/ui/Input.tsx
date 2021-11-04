import React from 'react';
import clsx from 'clsx';

const VARIANTS = {
  primary: 'text-gray-200 bg-gray-700 ring-indigo-500 placeholder-gray-400',
  secondary: 'text-gray-900 bg-gray-100 ring-indigo-500 placeholder-gray-400',
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  htmlFor: string;
  labelClassName?: string;
  inputClassName?: string;
  variant?: keyof typeof VARIANTS;
};

/**
 * An accessible `<input />` element that is wrapped inside a `<label />`.
 */
export const Input: React.FC<InputProps> = ({
  children,
  htmlFor,
  type = 'text',
  variant = 'primary',
  id,
  labelClassName,
  inputClassName,
  ...props
}) => (
  <label className={clsx('flex flex-col mb-4', labelClassName)} htmlFor={htmlFor}>
    {children && <span className="mb-1 font-medium">{children}</span>}

    <input
      type={type}
      id={id || htmlFor}
      className={clsx(
        'transition px-4 py-2 rounded-md text-lg font-medium focus:outline-none focus:ring',
        VARIANTS[variant],
        inputClassName,
      )}
      {...props}
    />
  </label>
);
