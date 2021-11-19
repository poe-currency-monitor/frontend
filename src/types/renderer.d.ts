/**
 * Don't forget to add new methods to `types/renderer.d.ts` when exposing API
 * functions into the `window` object.
 */

import {
  OpenRemoteUrl,
  CloseWindow,
  MaximizeWindow,
  MinimizeWindow,
  GetProfiles,
  SetProfiles,
} from '../interfaces/context-bridge.interfaces';

declare global {
  interface Window {
    api: {
      openRemoteUrl: OpenRemoteUrl;
      closeWindow: CloseWindow;
      maximizeWindow: MaximizeWindow;
      minimizeWindow: MinimizeWindow;
      getProfiles: GetProfiles;
      setProfiles: SetProfiles;
    };
  }
}
