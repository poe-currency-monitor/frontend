import * as React from 'react';

export type LayoutProps = {
  /**
   * Classname to apply to the `<section />` element.
   */
  className?: string;

  /**
   * Classname to apply to the root Layout element.
   */
  wrapperClassName?: string;
};

/**
 * Layout component that encapsulates entire views.
 */
export const Layout: React.FC<LayoutProps> = ({ children, className, wrapperClassName }) => {
  return (
    <div className={wrapperClassName || 'min-h-screen h-auto'}>
      <section className={className || 'max-w-5xl pt-8 mx-auto'}>{children}</section>
    </div>
  );
};
