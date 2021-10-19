import * as React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { postLogin } from '../../API';
import { UserContext } from '../../contexts/UserContext';

export const Auth: React.FC = () => {
  const history = useHistory();

  const user = React.useContext(UserContext);

  const inputEl = React.useRef<HTMLInputElement | null>(null);

  const doLogin = useMutation(['doLogin'], postLogin, {
    onSuccess: (data) => {
      user.setPoesessid(inputEl.current?.value || null);
      user.setToken(data.token);
      user.setAccountName(data.accountName);

      history.push('/profile');
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (inputEl.current && inputEl.current.value) {
      doLogin.mutate(inputEl.current.value);
    }
  };

  return (
    <section>
      <h1 className="mt-12 mb-4 leading-tight text-3xl text-center font-bold">PoE Baron Monitor</h1>

      <p className="mb-8 text-lg text-center">A tool to visualize advanced statistics about your mapping activity.</p>

      <form className="flex flex-col max-w-xs mx-auto" onSubmit={handleSubmit}>
        <label className="flex flex-col mb-4" htmlFor="poesessid">
          <span className="mb-1 font-medium">Enter your POESESSID</span>

          <input
            className="transition px-4 py-2 rounded-md text-lg text-zinc-900 font-medium ring-blue-500 focus:outline-none focus:ring placeholder-zinc-400"
            ref={inputEl}
            id="poesessid"
            type="text"
            placeholder="POESESSID"
            disabled={doLogin.isLoading}
          />
        </label>

        <button
          className="transition flex items-center justify-center py-2 px-3 rounded-md font-medium text-white bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          {doLogin.isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </section>
  );
};
