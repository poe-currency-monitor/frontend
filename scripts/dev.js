const { spawn } = require('child_process');
const { createServer } = require('vite');
const path = require('path');
const rimraf = require('rimraf');
const electron = require('electron');
const chalk = require('chalk');
const chokidar = require('chokidar');

const buildMain = require('./build-main');

const electronPath = String(electron);
const mainPath = path.normalize(path.join(__dirname, '../src/main/'));
const distPath = path.normalize(path.join(__dirname, '../dist'));
const vitePath = path.normalize(path.join(__dirname, '../node_modules/.vite'));

let viteDevServer = null;
let electronProcess = null;

function spawnElectronProcess() {
  console.log('\n');
  console.log(`  ${chalk.green('Starting Electron...\n')}`);

  electronProcess = spawn(electronPath, ['.'], { env: { ...process.env, NODE_ENV: 'development' } });

  electronProcess.stdout.on('data', (data) => console.log(data.toString()));
  electronProcess.stderr.on('data', (data) => console.error(data.toString()));
}

chokidar.watch(mainPath).on('change', async () => {
  if (electronProcess) {
    electronProcess.kill();
  }

  console.log(chalk.green('Detected changes in src/main folder, recompiling Electron app...\n'));

  buildMain();
  spawnElectronProcess();
});

(async () => {
  rimraf.sync(distPath);
  rimraf.sync(vitePath);

  buildMain();

  console.log(chalk.green('Starting Vite dev-server with NODE_ENV=development...\n'));

  viteDevServer = await createServer({
    mode: 'development',
    configFile: 'vite.config.ts',
  });

  await viteDevServer.listen();

  spawnElectronProcess();
})();
