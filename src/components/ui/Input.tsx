import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  htmlFor: string;
};

/**
 * An accessible `<input />` element that is wrapped inside a `<label />`.
 */
export const Input: React.FC<InputProps> = ({ children, htmlFor, type = 'text', id, ...props }) => (
  <label className="flex flex-col mb-4" htmlFor={htmlFor}>
    <span className="mb-1 font-medium">{children}</span>

    <input
      type={type}
      id={id || htmlFor}
      className="transition px-4 py-2 rounded-md text-lg text-zinc-900 font-medium ring-blue-500 focus:outline-none focus:ring placeholder-zinc-400"
      {...props}
    />
  </label>
);
