import * as React from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';

import { CreateProfileModal } from './CreateProfileModal';

export const ProfileList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <ul className="grid grid-cols-3 gap-4 max-w-3xl min-h-[192px] mx-auto">
        <li className="h-full w-full">
          <button
            type="button"
            className="transition flex flex-col items-center justify-center h-full w-full px-2 py-4 border-2 border-dashed border-zinc-500 rounded-md cursor-pointer hover:border-zinc-400 focus:outline-none"
            onClick={() => setIsModalOpen(true)}
            onKeyPress={(event) => (event.key === 'Enter' ? setIsModalOpen(true) : null)}
          >
            <PlusCircleIcon className="block h-10 w-auto mb-3" />

            <p className="text-base font-medium">Create new profile</p>
          </button>
        </li>
      </ul>

      <CreateProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
