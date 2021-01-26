import React, { useContext, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'antd';

import { postLogin } from '../../API';
import { UserContext } from '../../contexts/UserContext';

export const LoginView: React.FC = () => {
  const history = useHistory();
  const { setPoesessid, setAccountName, setToken } = useContext(UserContext);

  const [poesessidInput, setPoesessidInput] = useState('');
  const isPoesessidInputValid = useMemo(() => /[A-Fa-f0-9]{32}/gm.test(poesessidInput), [poesessidInput]);

  const login = useMutation(() => postLogin(poesessidInput), {
    onSuccess: (data) => {
      setPoesessid(poesessidInput);
      setAccountName(data.accountName);
      setToken(data.token);
      history.push('/setup');
    },
  });

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPoesessidInputValid) {
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
          onChange={(e) => setPoesessidInput(e.target.value)}
          style={{ marginBottom: '0.5rem' }}
        />

        <Button type="primary" htmlType="submit" loading={login.isLoading} disabled={!isPoesessidInputValid}>
          Login
        </Button>
      </form>
    </main>
  );
};
