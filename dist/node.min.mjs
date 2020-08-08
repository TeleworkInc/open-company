/*
 MIT
*/
'use strict';import fs,{existsSync}from"fs";import path,{resolve}from"path";import shell from"await-shell";import chalk from"chalk";import chokidar from"chokidar";import filetouch from"filetouch";import ora from"ora";const INTRO_TEMPLATE=`
/**
 * The Production flag will be overwritten to \`true\` when the project is
 * compiled in release mode.
 *
 * @define {boolean}
 */
export const PRODUCTION = goog.define('PRODUCTION', false);

console.log('Welcome to gnv!');
console.log('Production mode:', PRODUCTION);
`;const ESLINT_TEMPLATE=`
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
`;const DEFAULT_FLAGS=['-W="VERBOSE"',"--process_common_js_modules",'--module_resolution="NODE"','--language_in="ECMASCRIPT_NEXT"','--jscomp_off="nonStandardJsDocs"',"--rewrite_polyfills","--use_types_for_optimization"];const blue=(...msgs)=>chalk.blueBright(...msgs);const success=(...msgs)=>console.log(chalk.bgCyan(chalk.whiteBright(" SUCCESS ")),...msgs,"\n");const error=(...msgs)=>console.log(chalk.bgRed(" ERROR "),...msgs,"\n");const callCompiler=async(mode="dev",...customFlags)=>{const FLAGS=
[...customFlags,...DEFAULT_FLAGS,`--js_output_file="dist/${mode}.js"`];const commandArg=`google-closure-compiler ${FLAGS.join(" ")}`;const spinner=ora("Compiling...");console.log("\n"+chalk.grey(commandArg));global.SPAWN_OPTIONS={stdio:["ignore","ignore","inherit"]};try{spinner.start();await shell(commandArg)}catch(e){console.log(e);spinner.fail("Oops! Something went wrong.")}spinner.succeed("Compiled "+blue(`${mode}.js`))};const create=async name=>{if(existsSync(name))error("File or directory already exists.");
else{await initialize(name);success("Created project at:",blue(name))}};const devCompile=async()=>{await shell("yarn run:rollup")};const compile=async(devOnly=false)=>{if(!checkInsideProject())return error("\nDirectory is not a gnv workspace.");await shell("yarn eslint {lib,exports}/**/*.js","yarn compile");console.log()};const develop=async program=>{if(!checkInsideProject())return error("\nDirectory is not a gnv workspace.");chokidar.watch(`{lib,exports}/**/*.js`,{ignoreInitial:true}).on("all",
(event,path)=>compile(program));await compile();console.log("\nListening for file changes in",blue("lib/"))};const displayProjectInfo=()=>{if(checkInsideProject()){console.log(chalk.bgBlue(chalk.whiteBright(" DEV  ")),resolve("dist","dev.js"));console.log(chalk.bgCyan(chalk.whiteBright(" PROD ")),resolve("dist","release.js"));console.log()}};const initialize=async(dir=".")=>{const libDir=resolve(dir,"lib");const compileDir=resolve(dir,"dist");filetouch.dir(dir);filetouch.dir(libDir);filetouch.dir(compileDir);
filetouch.file(resolve(libDir,"index.js"),INTRO_TEMPLATE);filetouch.file(resolve(dir,".gitignore"),"node_modules/\ndist/","utf-8");filetouch.file(resolve(dir,".gnv"));filetouch.file(resolve(dir,".eslintrc.yaml"),ESLINT_TEMPLATE);const cmds=["yarn create esm -y","mv main.js index.mjs","mv index.js index.cjs","yarn add -D eslint eslint-config-google eslint-plugin-jsdoc","yarn add -D rollup rollup-plugin-executable"];global.SPAWN_OPTIONS={cwd:dir,stdio:"inherit"};await shell(...cmds)};const checkInsideProject=
()=>fs.existsSync(path.resolve(process.cwd(),".gnv"));export{callCompiler,checkInsideProject,compile,create,devCompile,develop,displayProjectInfo,initialize};
