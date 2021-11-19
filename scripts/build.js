const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const { build } = require('vite');

const buildMain = require('./build-main');

const distPath = path.normalize(path.join(__dirname, '../dist'));

(async () => {
  console.log(`${chalk.green('📦  Building Vite application for production...\n')}`);

  rimraf.sync(distPath);

  await build({
    mode: 'production',
    configFile: 'vite.config.ts',
    // Electron base URL must be `./` instead of the default `/`.
    base: './',
  });

  console.log('\n');
  buildMain();

  console.log(chalk.green.bold('🌟  Source-code successfully built.'));
  console.log(chalk.green.bold('    You can now bundle your Electron application.'));
})();