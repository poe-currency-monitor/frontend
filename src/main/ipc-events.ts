import { BrowserWindow, ipcMain } from 'electron';

export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const MAXIMIZE_WINDOW = 'MAXIMIZE_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';

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
};