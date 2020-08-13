# gnv-template
## Welcome to my [gnv project](https://github.com/TeleworkInc/gnv)!

I'm one big ES6 module, and I compile to multiple targets. 

### Prerequisites
Make sure to install `gnv` globally with:
```bash
yarn global add gnv
```

### Test out the CLI
Link this package to your bin with:
```bash
yarn link
```

and then run the dev CLI (executes source at `exports/cli.js`):
```bash
gnv-template-dev --help
```
```none
Usage: gnv-template-dev [options] [command]

Options:
  -h, --help       display help for command

Commands:
  say-hello [msg]  Say hello, or provide a special message instead.
  help [command]   display help for command
```

Build the project with:
```bash
gnv build
```

And run the production CLI (executes release build at `dist/cli.cjs`):
```bash
gnv-template --help
```