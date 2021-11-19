import { BrowserWindow, ipcMain } from 'electron';

import { Profile } from '../interfaces/profile.interfaces';
import { getProfiles, setProfiles } from './storage';

export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const MAXIMIZE_WINDOW = 'MAXIMIZE_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';

export const GET_PROFILES = 'GET_PROFILES';
export const RECEIVE_PROFILES = 'RECEIVE_PROFILES';
export const SET_PROFILES = 'SET_PROFILES';

/**
 * Start listening to various IPC events.
 */
export const registerIpcEvents = (): void => {
  ipcMain.on(MINIMIZE_WINDOW, () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();

    if (focusedWindow && focusedWindow.minimizable) {
      focusedWindow.minimize();
    }
  });

  ipcMain.on(MAXIMIZE_WINDOW, () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();

    if (focusedWindow) {
      if (!focusedWindow.isMaximized()) {
        focusedWindow.maximize();
      } else {
        focusedWindow.unmaximize();
      }
    }
  });

  ipcMain.on(CLOSE_WINDOW, () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();

    if (focusedWindow) {
      focusedWindow.close();
    }
  });

  ipcMain.on(GET_PROFILES, (event) => {
    const profiles = getProfiles();

    event.sender.send(RECEIVE_PROFILES, profiles);
  });

  ipcMain.on(SET_PROFILES, (event, profiles: Profile[]) => {
    setProfiles(profiles);
  });
};