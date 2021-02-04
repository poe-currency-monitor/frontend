import React, { useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Button, Select } from 'antd';

import { Character, StashTab } from '../../interfaces/poe.interfaces';
import { getCharacters, getStashTabs } from '../../API';
import { UserContext } from '../../contexts/UserContext';
import { useLogged } from '../../hooks/use-logged';

export const SetupView: React.FC = () => {
  const [poesessid, token, accountName] = useLogged();

  const { setSelectedCharacter, setSelectedStashTabs } = useContext(UserContext);
  const history = useHistory();

  const [selectedCharacterName, setSelectedCharacterName] = useState('');
  const [selectedStashTabsId, setSelectedStashTabsId] = useState<string[]>([]);

  const characters = useQuery(['getCharacters', poesessid, token, accountName], () =>
    poesessid && token && accountName ? getCharacters(poesessid, token, accountName) : null,
  );

  const selectedCharacter = useMemo<Character | undefined>(
    () =>
      characters.data
        ? characters.data.characters.find((character) => character.name === selectedCharacterName)
        : undefined,
    [characters, selectedCharacterName],
  );

  const stashTabs = useQuery(['getStashTabs', poesessid, token, accountName, selectedCharacterName], () =>
    selectedCharacter ? getStashTabs(poesessid, token, accountName, selectedCharacter.league) : null,
  );

  const selectedStashTabs = useMemo<StashTab[]>(
    () =>
      stashTabs.data
        ? selectedStashTabsId.map((selectedId) => stashTabs.data!.tabs.tabs.find((tab) => tab.id === selectedId)!)
        : [],
    [stashTabs, selectedStashTabsId],
  );

  const isFormValid = useMemo(() => !!selectedCharacter && selectedStashTabs.length > 0, [
    selectedCharacter,
    selectedStashTabs,
  ]);

  const characterOptions = useMemo(
    () =>
      characters.data
        ? characters.data.characters.map((character) => (
            <Select.Option key={character.name} value={character.name}>
              {character.name}
            </Select.Option>
          ))
        : null,
    [characters],
  );

  const stashTabsOptions = useMemo(
    () =>
      stashTabs.data
        ? stashTabs.data.tabs.tabs.map((tab) => (
            <Select.Option key={tab.id} value={tab.id}>
              {tab.n ? tab.n : '-'} <span className="px-1 text-xs text-gray-400">{tab.type}</span>
            </Select.Option>
          ))
        : null,
    [stashTabs],
  );

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!!selectedCharacter && selectedStashTabs.length > 0) {
      setSelectedCharacter(selectedCharacter);
      setSelectedStashTabs(selectedStashTabs);
      history.push('/setup-rates');
    }
  };

  const handleOnChangeCharacter = (value: string) => {
    setSelectedCharacterName(value);
  };

  const handleOnChangeStashTab = (value: string[]) => {
    setSelectedStashTabsId(value);
  };

  return (
    <main className="flex flex-col justify-center max-w-5xl mx-auto">
      <h1 className="mb-8 mt-12 text-white text-center text-3xl font-bold">Setup your session</h1>

      <form className="flex flex-col justify-center items-center max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <p className="text-white text-center text-base">Select your character:</p>

        <Select
          className="w-96"
          defaultValue={selectedCharacterName}
          loading={characters.isLoading}
          onChange={handleOnChangeCharacter}
          style={{ marginBottom: '0.5rem' }}
        >
          {characterOptions}
        </Select>

        <p className="mb-2 text-white text-center text-base">Select the stash-tabs you want to use:</p>

        <Select
          className="w-96"
          mode="multiple"
          defaultValue={selectedStashTabsId}
          loading={stashTabs.isLoading}
          onChange={handleOnChangeStashTab}
          disabled={!selectedCharacter}
          style={{ marginBottom: '0.5rem' }}
        >
          {stashTabsOptions}
        </Select>

        <Button type="primary" htmlType="submit" disabled={!isFormValid}>
          Finish setup
        </Button>
      </form>
    </main>
  );
};
