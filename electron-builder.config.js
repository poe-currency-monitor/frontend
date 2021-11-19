const now = new Date();
const buildVersion = `${now.getFullYear() - 2000}.${now.getMonth() + 1}.${now.getDate()}`;

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'io.totominc.poe-baron-monitor',
  productName: 'PoE Baron Monitor',

  directories: {
    output: 'build',
    buildResources: 'build-resources',
  },

  files: ['dist/**/*', 'build-resources/icon.*'],

  extraMetadata: {
    version: buildVersion,
  },
};

module.exports = config;
