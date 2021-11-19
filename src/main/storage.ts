import Store from 'electron-store';

import { Profile } from '../interfaces/profile.interfaces';

type StoreType = {
  profiles: Profile[];
};

const store = new Store<StoreType>();

/**
 * Returns user profiles saved.
 */
export const getProfiles = () => {
  return store.get('profiles');
};

/**
 * Saves user profiles.
 */
export const setProfiles = (profiles: Profile[]) => {
  store.set('profiles', profiles);
}
