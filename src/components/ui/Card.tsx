import * as React from 'react';
import clsx from 'clsx';

export type CardProps = {
  children: React.ReactNode;
  title: string;
  badge?: string;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, title, badge, className }) => (
  <div className={clsx('w-2/5 p-6 rounded-2xl bg-gray-700 shadow', className)}>
    <div className="flex justify-between mb-3">
      <p className="text-base font-medium text-white">{title}</p>

      {badge ? (
        <p className="flex items-center justify-center px-2 py-1 rounded-xl font-medium text-xs text-gray-300 bg-gray-600">
          {badge}
        </p>
      ) : null}
    </div>

    {children}
  </div>
);
