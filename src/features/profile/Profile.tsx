import * as React from 'react';

import { UserContext } from '../../contexts/UserContext';
import { ProfileList } from './ProfileList';

export const Profile: React.FC = () => {
  const user = React.useContext(UserContext);

  return (
    <section>
      <h2 className="mt-12 mb-4 leading-tight text-2xl text-center font-bold">Profile selection</h2>

      <p className="mb-8 text-lg text-center">Select or create the profile you want to use for this session.</p>

      <ProfileList profiles={user.profiles} />
    </section>
  );
};
