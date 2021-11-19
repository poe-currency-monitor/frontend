import path from 'path';
import { BrowserWindow, app } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

import { registerIpcEvents } from './ipc-events';

const env = process.env.NODE_ENV;

let mainWindow: BrowserWindow | null = null;

/**
 * Create main browser window for Electron.
 */
const createWindow = async (): Promise<void> => {
  mainWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    minWidth: 1200,
    width: 1200,
    minHeight: 768,
    height: 768,
  });

  const htmlProductionPath = path.join(__dirname, '../../index.html');
  const htmlProductionUrl = new URL('index.html', `file://${htmlProductionPath}`).toString();

  const urlToLoad = env === 'development' ? 'http://localhost:3000' : htmlProductionUrl;

  await mainWindow.loadURL(urlToLoad);
};

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.focus();
  }
});

app
  .whenReady()
  .then(async () => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line promise/no-nesting, no-console
      await installExtension(REACT_DEVELOPER_TOOLS).catch((err) => console.log('Unable to load React DevTools:', err));
    }

    registerIpcEvents();

    return createWindow();
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.error('Failed to create main window:', err));
