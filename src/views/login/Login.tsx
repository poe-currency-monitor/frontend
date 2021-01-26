import React, { useContext, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'antd';

import { postLogin } from '../../API';
import { UserContext } from '../../contexts/UserContext';

export const LoginView: React.FC = () => {
  const history = useHistory();
  const { setAccountName, setToken } = useContext(UserContext);

  const [poesessid, setPoesessid] = useState('');
  const isPoesessidValid = useMemo(() => /[A-Fa-f0-9]{32}/gm.test(poesessid), [poesessid]);

  const login = useMutation(() => postLogin(poesessid), {
    onSuccess: (data) => {
      setAccountName(data.accountName);
      setToken(data.token);
      history.push('/setup');
    },
  });

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPoesessidValid) {
      login.mutate();
    }
  };

  return (
    <main className="flex flex-col justify-center max-w-5xl mx-auto">
      <h1 className="mb-4 mt-12 text-white text-center text-3xl font-bold">Path of Exile — Mapping Helper</h1>

      <p className="mb-4 text-white text-center text-base">
        Mapping income tracking across multiple stash-tabs, shareable and detailed mapping history.
      </p>

      <form className="flex flex-col justify-center items-center max-w-sm mx-auto" onSubmit={handleOnSubmit}>
        <Input
          placeholder="Enter your POESESSID..."
          type="text"
          onChange={(e) => setPoesessid(e.target.value)}
          style={{ marginBottom: '0.5rem' }}
        />

        <Button type="primary" htmlType="submit" loading={login.isLoading} disabled={!isPoesessidValid}>
          Login
        </Button>
      </form>
    </main>
  );
};
