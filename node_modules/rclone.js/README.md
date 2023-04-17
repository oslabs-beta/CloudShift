# Rclone.js

The JavaScript API to the "Swiss army knife of cloud storage"
[rclone](https://rclone.org/).

Besides providing a way to install rclone on different platforms, a CLI and
a JavaScript API are included.

## Installation

```sh
npm install rclone.js
```

After installation, the latest binary of `rclone` is also fetched based on
your system environment.

If a custom version of `rclone` binary is needed, use `RCLONE_EXECUTABLE`
environment variable to set the path to that custom binary.

## Usage

### Node.js

Except `selfupdate`, which is used to update `rclone` binary, all API functions
return a child process whose events we can listen to. Optional flags can be
passed as an object to the last argument of the function call. Except removing
the `--` prefix, there is no other conversion to the flag name. JSON values are
stringified before passed to `rclone`.

Each API functions can also take options for the spawned child process. See
https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
for their documentation.

```js
const rclone = require("rclone.js");

const ls = rclone.ls("source:", {
  "max-depth": 1,
  // Spawn options:
  "env": {
    RCLONE_CONFIG: "~/.config/rclone/rclone.conf",
  },
  "shell": "/bin/sh",
});

ls.stdout.on("data", (data) => {
  console.log(data.toString());
});

ls.stderr.on("data", (data) => {
  console.error(data.toString());
});
```

There is also a Promise-based API:

```js
const rclone = require("rclone.js").promises;

(async function() {
  const results = await rclone.ls("source:", {
    "max-depth": 1,
    // Spawn options:
    "env": {
      RCLONE_CONFIG: "~/.config/rclone/rclone.conf",
    },
    "shell": "/bin/sh",
  });

  console.log(results);
})();
```

When the official `rclone` adds new command that has not been provided here,
we can still use the command through the default exported functions, passing
the command name as first argument:

```js
const rclone = require("rclone.js");

rclone("newcommand", "source:", "target:", {
  "flag": true,
});

(async function() {
  const results = await rclone.promises("newcommand", "source:", "target:", {
    "flag": true,
  });

  console.log(results);
})();
```

### CLI

This simple CLI calls the JS API above and outputs `stdout` and `stderr`.

```sh
$ npx rclone --version
rclone v1.54.0
- os/arch: darwin/amd64
- go version: go1.15.7
```

```sh
$ npx rclone ls source: --max-depth 1
          -1 2020-12-12 10:01:44        -1 Documents
          -1 2020-12-11 16:24:20        -1 Pictures
```

### Custom command

The CLI also supports executing a custom JS-based command to further extend
usage outside of what the official `rclone` offers:

```sh
$ npx rclone echo.js arg1 --string value arg2 --boolean
```

The custom JS file just needs to export a function that takes the arguments and
flags parsed from the CLI. It can either return a child process, or a `Promise`.
For a child process, its `stdout` and `stderr` are piped to the caller process.

Inside the function, `this` is set to `rclone.js` module.

```js
const { spawn } = require("child_process");

module.exports = function echo(arg1, arg2, flags = {}) {
  return spawn("echo", [arg1, arg2, JSON.stringify(flags)]);
}
```

The custom module is loaded through `require`, so it has some nice advantages
when [locating module](https://nodejs.org/api/modules.html#all-together):

- Does not need to specify `.js` extension, `custom` is same as `custom.js`.
- Considers both `foobar.js` and `foobar/index.js`.
- Can be extended through `NODE_PATH` environment variable.
- Can also use module from `node_modules` by its name.

With that, there are a few things custom commands can be used:

- Wraps existing API to add new functionality, such as `archive`.
- Defines a module with the same name as existing API to extend it with new
  flags and/or backends.

For a "real-life" example, check out [selfupdate](rclone/selfupdate.js), which
overrides the built-in `selfupdate` command to download rclone executable if it
has not been downloaded yet. Consecutive runs just call `selfupdate` API.

For publishing a custom `rclone` command as NPM package, consider prefixing the
package name with `rclone-` so it's clearer and not conflicting.

### Example Custom Commands

- [rclone-archive](https://www.npmjs.com/package/rclone-archive):
  Tracking https://github.com/rclone/rclone/issues/2815.
