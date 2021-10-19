import * as React from 'react';

import { PlusCircleIcon } from '@heroicons/react/solid';

export const ProfileList: React.FC = () => (
  <ul className="grid grid-cols-3 gap-4 max-w-3xl min-h-[192px] mx-auto">
    <li className="transition flex flex-col items-center justify-center h-full px-2 py-4 border-2 border-dashed border-zinc-500 rounded-md cursor-pointer hover:border-zinc-400">
      <PlusCircleIcon className="block h-10 w-auto mb-3" />

      <p className="text-base font-medium">Create new profile</p>
    </li>
  </ul>
);
