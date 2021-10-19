import * as React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { postLogin } from '../../API';
import { UserContext } from '../../contexts/UserContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const Auth: React.FC = () => {
  const history = useHistory();

  const user = React.useContext(UserContext);
  const [poesessid, setPoesessid] = React.useState('');

  const doLogin = useMutation(['doLogin'], postLogin, {
    onSuccess: (data) => {
      user.setPoesessid(poesessid);
      user.setToken(data.token);
      user.setAccountName(data.accountName);

      history.push('/profile');
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    doLogin.mutate(poesessid);
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPoesessid(event.target.value);
  };

  return (
    <section>
      <h1 className="mt-12 mb-4 leading-tight text-3xl text-center font-bold">PoE Baron Monitor</h1>

      <p className="mb-8 text-lg text-center">A tool to visualize advanced statistics about your mapping activity.</p>

      <form className="flex flex-col max-w-xs mx-auto" onSubmit={handleSubmit}>
        <Input
          htmlFor="poesessid"
          type="text"
          placeholder="POESESSID"
          disabled={doLogin.isLoading}
          onChange={handleOnChange}
        >
          Enter your POESESSID
        </Input>

        <Button variant="primary" type="submit">
          {doLogin.isLoading ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </section>
  );
};
