/**
 * Don't forget to add new methods to `types/renderer.d.ts` when exposing API
 * functions into the `window` object.
 */

import { contextBridge, ipcRenderer, shell } from 'electron';

import { OpenRemoteUrl, MinimizeWindow, MaximizeWindow, CloseWindow } from '../interfaces/context-bridge.interfaces';
import { CLOSE_WINDOW, MAXIMIZE_WINDOW, MINIMIZE_WINDOW } from './ipc-events';

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

contextBridge.exposeInMainWorld('api', { openRemoteUrl, minimizeWindow, maximizeWindow, closeWindow });