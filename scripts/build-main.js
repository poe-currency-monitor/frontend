const chalk = require('chalk');
const { execSync } = require('child_process');

/**
 * Run TypeScript compile with `tsc` command to compile the `src/main/index.ts`
 * to `dist/electron/index.js`.
 */
module.exports = function buildMain() {
  console.log(chalk.green('📦  Compiling main.ts into dist/\n'));

  execSync('tsc -p tsconfig.main.json', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      process.exit(0);
    }

    if (stdout) {
      console.log(stdout.toString());
    }

    if (stderr) {
      console.error(stderr.toString());
      process.exit(0);
    }
  });
};
