#!/usr/bin/env node
const { join } = require("path");

const mri = require("mri");

const rclone = require("../");

const {_: args, ...flags} = mri(process.argv.slice(2));
const [commandName, ...commandArguments] = args;

// Executes rclone command if available.
let { [commandName]: command } = rclone;

// The current directory has highest priority.
module.paths.push(".");
// Then the library's "rclone" folder for `rclone.js` custom commands.
module.paths.push(join(__dirname, "..", "rclone"));

try {
  // If the command is a custom module, requires it instead.
  command = require(commandName);
} catch(error) {
  try {
    // If exact name is not found, maybe one prefixed with `rclone-`?
    command = require(`rclone-${commandName}`);
  } catch(error) {

  }
}

const subprocess = command ?
      command.call(rclone, ...commandArguments, flags) :
      rclone(...args, flags);

try {
  if (subprocess.stdin) {
    process.stdin.pipe(subprocess.stdin);
  }
} catch (error) {
  console.error(error);
}

subprocess.stdout?.on("data", (data) => {
  process.stdout.write(data);
});

subprocess.stderr?.on("data", (data) => {
  process.stderr.write(data);
});
