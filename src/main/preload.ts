/**
 * Don't forget to add new methods to `types/renderer.d.ts` when exposing API
 * functions into the `window` object.
 */

import { contextBridge, ipcRenderer, shell } from 'electron';

import {
  OpenRemoteUrl,
  MinimizeWindow,
  MaximizeWindow,
  CloseWindow,
  GetProfiles,
  SetProfiles,
} from '../interfaces/context-bridge.interfaces';

import {
  CLOSE_WINDOW,
  MAXIMIZE_WINDOW,
  MINIMIZE_WINDOW,
  GET_PROFILES,
  RECEIVE_PROFILES,
  SET_PROFILES,
} from './ipc-events';

/**
 * Open a specific URL in the default browser.
 *
 * @param url URL to open.
 */
const openRemoteUrl: OpenRemoteUrl = (url) => {
  shell.openExternal(url).catch((err) => console.log(err));
};

/**
 * Retrieve the current focused window (if there is one) and minimize it.
 */
const minimizeWindow: MinimizeWindow = () => {
  ipcRenderer.send(MINIMIZE_WINDOW);
};

/**
 * Toggle the maximize/unmaximize status of the focused window (if there is one).
 */
const maximizeWindow: MaximizeWindow = () => {
  ipcRenderer.send(MAXIMIZE_WINDOW);
};

/**
 * Close the current focused window (if there is one).
 */
const closeWindow: CloseWindow = () => {
  ipcRenderer.send(CLOSE_WINDOW);
};

/**
 * Retrieve the list of profiles stored.
 */
const getProfiles: GetProfiles = () => {
  ipcRenderer.send(GET_PROFILES);

  return new Promise((resolve) => {
    ipcRenderer.once(RECEIVE_PROFILES, (_, profiles) => resolve(profiles || []));
  });
};

/**
 * Save the list of profiles.
 */
const setProfiles: SetProfiles = (profiles) => {
  ipcRenderer.send(SET_PROFILES, profiles);
};

contextBridge.exposeInMainWorld('api', {
  openRemoteUrl,
  minimizeWindow,
  maximizeWindow,
  closeWindow,
  getProfiles,
  setProfiles,
});