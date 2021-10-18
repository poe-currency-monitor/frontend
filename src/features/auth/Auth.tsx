import * as React from 'react';
import { useMutation } from 'react-query';

import { postLogin } from '../../API';
import { UserContext } from '../../contexts/UserContext';

export const Auth: React.FC = () => {
  const user = React.useContext(UserContext);

  const inputEl = React.useRef<HTMLInputElement | null>(null);
  const [poesessid, setPoesessid] = React.useState('');

  const doLogin = useMutation(['doLogin'], postLogin, {
    onSuccess: (data) => {
      user.setPoesessid(poesessid);
      user.setToken(data.token);
      user.setAccountName(data.accountName);
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (inputEl.current && inputEl.current.value) {
      setPoesessid(inputEl.current.value);
      doLogin.mutate(inputEl.current.value);
    }
  };

  return (
    <section>
      <h1>PoE Baron Monitor</h1>

      <p>A tool to visualize statistics on your mapping activity.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="poesessid">
          Enter your POESESSID
          <input ref={inputEl} id="poesessid" type="text" />
        </label>

        <button type="submit">Login</button>
      </form>
    </section>
  );
};
