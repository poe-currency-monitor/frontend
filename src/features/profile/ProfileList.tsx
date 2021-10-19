import * as React from 'react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/solid';

import { Profile } from '../../interfaces/profile.interfaces';
import { CreateProfileModal } from './CreateProfileModal';

export type ProfileListProps = {
  profiles: Profile[];
};

export const ProfileList: React.FC<ProfileListProps> = ({ profiles }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <ul className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
        <li className="h-full w-full">
          <button
            type="button"
            className="transition flex flex-col items-center justify-center min-h-[192px] h-full w-full px-2 py-4 border-2 border-dashed border-zinc-500 rounded-md cursor-pointer hover:border-zinc-400 focus:outline-none"
            onClick={() => setIsModalOpen(true)}
            onKeyPress={(event) => (event.key === 'Enter' ? setIsModalOpen(true) : null)}
          >
            <PlusCircleIcon className="block h-10 w-auto mb-3" />

            <p className="text-base font-medium">Create new profile</p>
          </button>
        </li>

        {profiles.map((profile) => (
          <li className="h-full w-full" key={profile.name}>
            <button
              type="button"
              className="transition flex flex-col items-center justify-center min-h-[192px] h-full w-full px-2 py-4 rounded-md cursor-pointer bg-slate-200 focus:outline-none"
              onKeyPress={(event) => (event.key === 'Enter' ? setIsModalOpen(true) : null)}
            >
              <h3 className="mb-4 text-center text-zinc-900 font-medium text-xl">{profile.name}</h3>

              <p className="mb-1 text-center text-zinc-700 font-medium text-base">{profile.league} league</p>

              <p className="text-center text-zinc-700 font-medium text-sm">{profile.tabs.length} stash-tabs</p>
            </button>
          </li>
        ))}
      </ul>

      <CreateProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
