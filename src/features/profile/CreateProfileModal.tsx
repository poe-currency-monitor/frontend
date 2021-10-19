import * as React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { XIcon } from '@heroicons/react/solid';

import { leagues } from '../../data/leagues';

export type CreateProfileModalTypes = Modal.Props & {
  onClose: () => unknown;
};

export const CreateProfileModal: React.FC<CreateProfileModalTypes> = ({ isOpen, onClose, ...props }) => {
  const leaguesOptions = React.useMemo(() => leagues.map((league) => ({ value: league.id, label: league.id })), []);

  React.useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      className="relative max-w-3xl px-6 py-4 mx-auto rounded-md text-zinc-900 bg-slate-100"
      {...props}
    >
      <button
        type="button"
        className="absolute top-0 right-0 h-auto w-auto mt-4 mr-4 cursor-pointer focus:outline-none"
      >
        <XIcon className="h-6 w-auto" onClick={onClose} onKeyPress={onClose} />
      </button>

      <h3 className="mb-8 font-medium text-2xl text-center">Create a new profile</h3>

      <form className="max-w-sm mx-auto">
        <label className="flex flex-col mb-4" htmlFor="profile-name">
          <span className="mb-1 font-medium">Enter your profile name</span>

          <input
            className="transition px-4 py-2 rounded-md text-lg text-zinc-900 font-medium ring-blue-500 focus:outline-none focus:ring placeholder-zinc-400"
            id="profile-name"
            type="text"
            placeholder="Profile name"
          />
        </label>

        <div>
          <p className="mb-1 font-medium">Choose your pricing league</p>

          <Select options={leaguesOptions} />
        </div>
      </form>
    </Modal>
  );
};
