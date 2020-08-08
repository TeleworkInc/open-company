#!/usr/bin/env node
import path, { resolve, basename } from 'path';
import program from 'commander';
import tree from 'tree-node-cli';
import chalk from 'chalk';
import fs, { existsSync } from 'fs';
import shell from 'await-shell';
import chokidar from 'chokidar';
import filetouch from 'filetouch';
import 'ora';

/**
 * @license MIT
 */
/**
 * @file
 * Specify the exports for this project's CLI.
 */
const INTRO_TEMPLATE = `
/**
 * The Production flag will be overwritten to \`true\` when the project is
 * compiled in release mode.
 *
 * @define {boolean}
 */
export const PRODUCTION = goog.define('PRODUCTION', false);

console.log('Welcome to gnv!');
console.log('Production mode:', PRODUCTION);
`;

const ESLINT_TEMPLATE = `
env:
  browser: true
  commonjs: true
  es2020: true
  node: true

extends:
  - google
  - plugin:jsdoc/recommended

parserOptions:
  ecmaVersion: 11
  sourceType: module

ignorePatterns:
  - "**/dist/**"

rules:
  require-jsdoc:
    - error
    - require:
        ClassDeclaration: true
        FunctionDeclaration: false
        MethodDefinition: false
        ArrowFunctionExpression: false
        FunctionExpression: false

  operator-linebreak:
    - error
    - before

  object-curly-spacing:
    - error
    - always

settings:
  jsdoc:
    mode: closure
`;

/**
 * @license MIT
 */

/**
 * Log messages in blue.
 *
 * @param {...string} msgs
 * The messages to log
 *
 * @return {void}
 */
const blue = (...msgs) => chalk.blueBright(...msgs);

const success = (...msgs) => console.log(
    chalk.bgCyan(
        chalk.whiteBright(' SUCCESS '),
    ),
    ...msgs,
    '\n',
);

const error = (...msgs) => console.log(
    chalk.bgRed(' ERROR '),
    ...msgs,
    '\n',
);


const create = async (name) => {
  if (existsSync(name)) {
    error('File or directory already exists.');
  } else {
    await initialize(name);
    success(
        'Created project at:',
        blue(name),
    );
  }
};


/**
 * Compile a gnv project.
 *
 * @param {boolean} devOnly
 * Set to `true` to only build the dev bundles.
 *
 * @return {void}
 */
const compile = async (devOnly = false) => {
  if (!checkInsideProject()) {
    return error('\nDirectory is not a gnv workspace.');
  }

  await shell(
      'yarn eslint {lib,exports}/**/*.js',
      'yarn compile',
  );

  console.log();
};


const develop = async (program) => {
  if (!checkInsideProject()) {
    return error('\nDirectory is not a gnv workspace.');
  }

  chokidar.watch(
      `{lib,exports}/**/*.js`,
      {
        ignoreInitial: true,
      },
  ).on('all',
      (event, path) => compile(program),
  );

  await compile();
  console.log('\nListening for file changes in', blue('lib/'));
};


const initialize = async (dir = '.') => {
  const libDir = resolve(dir, 'lib');
  const compileDir = resolve(dir, 'dist');

  /**
   * Ensure all necessary dirs exist using `filetouch`.
   */
  filetouch.dir(dir);
  filetouch.dir(libDir);
  filetouch.dir(compileDir);

  /**
   * Add `lib/index.js` if it doesn't exist.
   */
  filetouch.file(
      resolve(libDir, 'index.js'),
      INTRO_TEMPLATE,
  );

  /**
   * Add `node_modules` and `dist` to project `.gitignore`.
   */
  filetouch.file(
      resolve(dir, '.gitignore'),
      'node_modules\/\ndist\/',
      'utf-8',
  );

  filetouch.file(resolve(dir, '.gnv'));
  filetouch.file(resolve(dir, '.eslintrc.yaml'), ESLINT_TEMPLATE);

  const cmds = [
    'yarn create esm -y',
    'mv main.js index.mjs',
    'mv index.js index.cjs',
    'yarn add -D eslint eslint-config-google eslint-plugin-jsdoc',
    'yarn add -D rollup rollup-plugin-executable',
  ];

  global.SPAWN_OPTIONS = { cwd: dir, stdio: 'inherit' };
  await shell(...cmds);
};


const checkInsideProject = () => fs.existsSync(
    path.resolve(process.cwd(), '.gnv'),
);

/**
 * @license MIT
 */

const CWD = process.cwd();
const PROJECT_NAME = basename(CWD);

/**
 * Assign actions to CLI commands.
 */
program
    .command('create <project>')
    .description('Create a new gnv workspace.')
    .action(create);

program
    .command('develop')
    .description('Start developing and build when changes are made.')
    .action(develop);

program
    .command('compile')
    .description('Compile this workspace and output in [dist].')
    .action(compile);

program
    .command('init [directory]')
    .description('Initialize a workspace inside an existing directory.')
    .action(initialize);

/**
 * Print some info about the project directory.
 */
const TREE = (
  checkInsideProject()
  ? '\n' + tree('./lib')
  : ''
);

const HEAD = (
  checkInsideProject()
  ? ` ${PROJECT_NAME} `
  : ''
);

console.log('\n', chalk.grey('--- 𝓰𝓷𝓿 ---'), '\n');
if (HEAD) console.log(chalk.bgBlue(chalk.whiteBright(HEAD)));
if (TREE) console.log(chalk.blueBright(TREE), '\n');

/**
 * Parse command line arguments. Use try {...} catch {...} and
 * program.exitOverride() to prevent nonzero exit.
 */
try {
  program.exitOverride();
  program.parse(process.argv);
} catch (e) {
  /**
   * Don't bother throwing any errors if there are no args provided.
   */
}
