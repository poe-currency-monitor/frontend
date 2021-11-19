import React from 'react';
import { DuplicateIcon, XIcon } from '@heroicons/react/solid';

export const TitleBar: React.FC = () => {
  return (
    <header className="z-50 fixed top-0 left-0 flex items-center justify-between right-0 h-10 w-full bg-blue-gray-800">
      <div className="w-full h-full webkit-app-region-drag" />

      <div className="flex items-center justify-center">
        <button
          type="button"
          className="flex items-center justify-center h-10 w-10 cursor-default focus:outline-none hover:bg-gray-700"
          onClick={() => window.api.minimizeWindow()}
        >
          <span className="h-[2px] w-3 mt-3 bg-gray-50" />
        </button>

        <button
          type="button"
          className="flex items-center justify-center h-10 w-10 cursor-default focus:outline-none text-gray-50 hover:bg-gray-700"
          onClick={() => window.api.maximizeWindow()}
        >
          <DuplicateIcon className="w-5 h-5 -scale-100" />
        </button>

        <button
          type="button"
          className="flex items-center justify-center h-10 w-10 cursor-default focus:outline-none text-gray-50 hover:bg-red-500"
          onClick={() => window.api.closeWindow()}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
