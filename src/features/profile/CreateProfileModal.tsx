import * as React from 'react';
import Modal from 'react-modal';
import { useQuery } from 'react-query';
import { XIcon } from '@heroicons/react/solid';

import { StashTab } from '../../interfaces/poe.interfaces';
import { getStashTabs } from '../../API';
import { leagues } from '../../data/leagues';
import { UserContext } from '../../contexts/UserContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Select, SelectOption } from '../../components/ui/Select';
import { MultiSelect, MultiSelectOptions } from '../../components/ui/MultiSelect';

export type CreateProfileModalTypes = Modal.Props & {
  onClose: () => unknown;
};

export const CreateProfileModal: React.FC<CreateProfileModalTypes> = ({ isOpen, onClose, ...props }) => {
  React.useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const user = React.useContext(UserContext);

  const [name, setName] = React.useState('');
  const [league, setLeague] = React.useState<string | null>(null);
  const [tabs, setTabs] = React.useState<StashTab[]>([]);

  const leaguesOptions = React.useMemo(() => leagues.map((l) => ({ value: l.id, label: l.id })), []);

  const fetchTabs = useQuery(
    ['fetchTabs', { accountName: user.accountName, league, poesessid: user.poesessid, token: user.token }],
    getStashTabs,
    {
      enabled: !!league,
    },
  );

  const tabsOptions = React.useMemo<SelectOption[]>(
    () => (fetchTabs.data ? fetchTabs.data.tabs.tabs.map((tab) => ({ label: tab.n, value: tab.id })) : []),
    [fetchTabs],
  );

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    if (name && league && tabs.length) {
      user.setProfiles([
        ...user.profiles,
        {
          league,
          name,
          tabs: tabs.map((tab) => ({
            id: tab.id,
            name: tab.n,
            type: tab.type,
          })),
        },
      ]);

      onClose();
    }
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleLeagueChange = (option: SelectOption | null) => {
    if (option) {
      setLeague(option.value);
    } else {
      setLeague('');
    }
  };

  const handleTabsChange = (options: MultiSelectOptions) => {
    if (fetchTabs.data && options.length) {
      const fetchedTabs = fetchTabs.data.tabs.tabs;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const fullTabs = options.map((option) => fetchedTabs.find((tab) => tab.id === option.value)!);

      setTabs([...fullTabs]);
    } else {
      setTabs([]);
    }
  };

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

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <Input htmlFor="profile-name" type="text" placeholder="Profile name" onChange={handleOnChange}>
          Enter your profile name
        </Input>

        <fieldset className="mb-4">
          <p className="mb-1 font-medium">Choose your pricing league</p>

          <Select options={leaguesOptions} onChange={handleLeagueChange} />
        </fieldset>

        <fieldset className="mb-8">
          <p className="mb-1 font-medium">Select your stash-tabs</p>

          <MultiSelect options={tabsOptions} isDisabled={!fetchTabs.isFetched} onChange={handleTabsChange} />
        </fieldset>

        <Button type="submit" className="w-full">
          Create profile
        </Button>
      </form>
    </Modal>
  );
};
