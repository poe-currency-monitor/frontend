import React from 'react';
import clsx from 'clsx';

const VARIANTS = {
  primary: 'bg-blue-500 text-slate-100 hover:bg-blue-600',
  secondary: 'bg-zinc-600 text-slate-100 hover:bg-zinc-700',
  tertiary: 'text-red-600',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS;
};

/**
 * A `<button />` that already have a default style. You can use the `variant`
 * prop to set a default variant style _(primary, secondary or tertiary)_.
 *
 * Use this button component only for actions that doesn't make the user leave
 * the page.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) => (
  <button
    type={type === 'submit' ? 'submit' : 'button'}
    className={clsx(
      'flex items-center justify-center px-4 py-2 rounded-md font-medium text-base transition',
      VARIANTS[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
