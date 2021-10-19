import * as React from 'react';

import { ProfileList } from './ProfileList';

export const Profile: React.FC = () => (
  <section>
    <h2 className="mt-12 mb-4 leading-tight text-2xl text-center font-bold">Profile selection</h2>

    <p className="mb-8 text-lg text-center">Select or create the profile you want to use for this session.</p>

    <ProfileList />
  </section>
);
