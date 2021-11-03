import * as React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { postLogin } from '../../API';
import { UserContext } from '../../contexts/UserContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Layout } from '../../components/Layout';

/**
 * Auth view where user can login using its POESESSID.
 *
 * If user already have a POESESSID in local-storage, it will be automatically
 * used to login. If it fails, delete the POESESSID from local-storage.
 */
export const Auth: React.FC = () => {
  const history = useHistory();

  const user = React.useContext(UserContext);
  const [poesessid, setPoesessid] = React.useState('');

  const doLogin = useMutation(['doLogin'], postLogin, {
    onSuccess: (data) => {
      // `poesessid` variable is not defined if it's called from auto-login,
      // because this variable is used by the input field.
      if (poesessid) {
        user.setPoesessid(poesessid);
      }

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

  // On mounted, if there is already a `poesessid` it means it was set by the
  // `UserContext` when loading it from the local-storage. Try to silently
  // login with that `poesessid`. If it fails, remove it from local-storage.
  //
  // TODO: on auto-login fail, create a notification to ask for user to re-login.
  React.useEffect(() => {
    if (user.poesessid) {
      doLogin.mutate(user.poesessid, { onError: () => user.setPoesessid(null) });
    }
  }, []);

  return (
    <Layout className="max-w-xl mx-auto pt-8">
      <h1 className="mb-4 leading-tight text-3xl text-center font-bold">PoE Baron Monitor</h1>

      <p className="mb-8 text-lg text-center">A tool to visualize advanced statistics about your mapping activity.</p>

      <form className="flex flex-col max-w-xs mx-auto mb-8" onSubmit={handleSubmit}>
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

      <p className="mb-4 font-medium text-lg">Why is the POESESSID required for this tool?</p>

      <p className="mb-2">
        Your <b>POESESSID</b> is used to access to your list of characters and stash-tabs with their items. The tool
        will send a request to the web-service powering this tool in order to send data such as characters, stash-tabs
        and their content.
      </p>

      <p className="mb-4">
        <b>Your token is never stored by the web-service</b>, it is read-only by the web-service.
      </p>

      <p className="mb-4 font-medium text-lg">Why are you not using Path of Exile official OAuth API?</p>

      <p>
        Because their OAuth API currently doesn&apos;t support stash-tabs and their content, so we need to use the old
        method which uses <b>the POESESSID</b>.
      </p>
    </Layout>
  );
};
