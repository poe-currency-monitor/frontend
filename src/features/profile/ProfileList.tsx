import * as React from 'react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/solid';

import { Profile } from '../../interfaces/profile.interfaces';
import { CreateProfileModal } from './CreateProfileModal';

export type ProfileListProps = {
  profiles: Profile[];
  isLoadingProfile: boolean;

  onDeleteProfile: (profile: Profile) => unknown;
  onSelectProfile: (profile: Profile) => unknown;
};

export const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  isLoadingProfile,
  onDeleteProfile,
  onSelectProfile,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <ul className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
        <li className="h-full w-full">
          <button
            type="button"
            className="transition flex flex-col items-center justify-center min-h-[192px] h-full w-full px-2 py-4 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-gray-400 focus:outline-none"
            onClick={() => setIsModalOpen(true)}
            onKeyPress={(event) => (event.key === 'Enter' ? setIsModalOpen(true) : null)}
          >
            <PlusCircleIcon className="block h-10 w-auto mb-3" />

            <p className="text-base font-medium">Create new profile</p>
          </button>
        </li>

        {profiles.map((profile) => (
          <li className="relative h-full w-full" key={profile.name}>
            {!isLoadingProfile ? (
              <>
                <button
                  type="button"
                  className="transition flex flex-col items-center justify-center min-h-[192px] h-full w-full px-2 py-4 rounded-md cursor-pointer bg-gray-200 focus:outline-none"
                  onKeyPress={(event) => (event.key === 'Enter' ? onSelectProfile(profile) : null)}
                  onClick={() => onSelectProfile(profile)}
                >
                  <h3 className="mb-4 text-center text-gray-900 font-medium text-xl">{profile.name}</h3>

                  <p className="mb-1 text-center text-gray-700 font-medium text-base">{profile.league} league</p>

                  <p className="text-center text-gray-500 font-medium text-sm">{profile.tabs.length} stash-tabs</p>
                </button>

                <button
                  type="button"
                  className="transition absolute top-0 right-0 mt-2 mr-2 text-red-600 hover:text-red-700"
                  onClick={() => onDeleteProfile(profile)}
                >
                  <TrashIcon className="w-6 h-auto fill-current" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[192px] h-full w-full px-2 py-4 rounded-md bg-gray-200">
                <p className="mb-1 text-center text-gray-700 font-medium text-base">Loading...</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      <CreateProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
