import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Profile as ProfileType } from '../../interfaces/profile.interfaces';
import { UserContext } from '../../contexts/UserContext';
import { ProfileList } from './ProfileList';

export const Profile: React.FC = () => {
  const history = useHistory();

  const user = React.useContext(UserContext);

  const handleDeleteProfile = (profile: ProfileType) => {
    const newProfiles = user.profiles.filter((p) => p.name !== profile.name);

    user.setProfiles([...newProfiles]);
  };

  const handleSelectProfile = (profile: ProfileType) => {
    user.setCurrentProfile(profile);
    history.push('/dashboard');
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
