import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { StashTabsItems } from '../../interfaces/poe.interfaces';
import { Profile as ProfileType } from '../../interfaces/profile.interfaces';
import { UserContext } from '../../contexts/UserContext';
import { useLoadStashTabs } from '../../hooks/useLoadStashTabs';
import { useLoadRates } from '../../hooks/useLoadRates';
import { useLoadStashItems } from '../../hooks/useLoadStashItems';
import { ProfileList } from './ProfileList';

export const Profile: React.FC = () => {
  const history = useHistory();

  const user = React.useContext(UserContext);

  const tabsIndexes = React.useMemo<string>(
    () => user.stashTabs.map((stashTab) => stashTab.i).join(','),
    [user.stashTabs],
  );

  const { fetchCurrenciesRates, fetchItemsRates } = useLoadRates(user.token, user.currentProfile?.league);

  const { fetchStashTabs } = useLoadStashTabs(
    user.token,
    user.poesessid,
    user.currentProfile?.league,
    user.accountName,
  );

  const { fetchStashItems } = useLoadStashItems(
    user.token,
    user.poesessid,
    user.currentProfile?.league,
    user.accountName,
    tabsIndexes,
  );

  // Load currencies and items rates when a profile has been selected.
  React.useEffect(() => {
    if (user.currentProfile && !fetchCurrenciesRates.data && !fetchItemsRates.data && !fetchItemsRates.isError) {
      // Rates are automatically added to RatesContext inside the query definition.
      fetchCurrenciesRates.refetch().catch(() => null);
      fetchItemsRates.refetch().catch(() => null);
    }
  }, [user, fetchCurrenciesRates, fetchItemsRates]);

  // When profile is selected, this effect is called, so we can load stash-tabs,
  // items-rates and stash-tabs items.
  React.useEffect(() => {
    if (user.currentProfile && !fetchStashTabs.data && !fetchStashTabs.isError) {
      fetchStashTabs
        .refetch()
        .then((response) => (response.data ? user.setStashTabs(response.data.tabs.tabs) : null))
        .catch(() => null);
    }
  }, [user, fetchStashTabs]);

  // Once stash-tabs have been loaded, `tabsIndexes` should have been updated
  // so we can fetch stash-items.
  React.useEffect(() => {
    if (user.currentProfile && tabsIndexes && !fetchStashItems.data && !fetchStashItems.isError) {
      fetchStashItems
        .refetch()
        .then((response) => {
          if (response.data) {
            const stashTabsItems: StashTabsItems = {};

            Object.entries(response.data.items).forEach(([key, value]) => {
              stashTabsItems[key] = value.items;
            });

            user.setStashTabsItems(stashTabsItems);
          }

          return response;
        })
        .catch(() => null);
    }
  }, [user, tabsIndexes, fetchStashItems]);

  // Once everything has been loaded, we can redirect to the dashboard view.
  React.useEffect(() => {
    if (fetchCurrenciesRates.data && fetchItemsRates.data && fetchStashTabs.data && fetchStashItems.data) {
      history.push('/dashboard');
    }
  }, [history, fetchCurrenciesRates, fetchItemsRates, fetchStashTabs, fetchStashItems]);

  const handleDeleteProfile = (profile: ProfileType) => {
    const newProfiles = user.profiles.filter((p) => p.name !== profile.name);

    user.setProfiles([...newProfiles]);
  };

  const handleSelectProfile = (profile: ProfileType) => {
    user.setCurrentProfile(profile);
  };

  return (
    <section>
      <h2 className="mt-12 mb-4 leading-tight text-2xl text-center font-bold">Profile selection</h2>

      <p className="mb-8 text-lg text-center">Select or create the profile you want to use for this session.</p>

      <ProfileList
        profiles={user.profiles}
        onDeleteProfile={handleDeleteProfile}
        onSelectProfile={handleSelectProfile}
      />
    </section>
  );
};
