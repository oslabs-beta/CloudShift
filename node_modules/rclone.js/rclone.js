const { join } = require("path");
const { spawn, ChildProcess } = require("child_process");

let { platform } = process;

const RCLONE_DIR = join(__dirname, "bin");
const DEFAULT_RCLONE_EXECUTABLE = join(RCLONE_DIR, `rclone${ platform === "windows"? ".exe" : "" }`);
const {
  RCLONE_EXECUTABLE = DEFAULT_RCLONE_EXECUTABLE,
} = process.env;

const CHILD_OPTIONS = [
  "cwd",
  "env",
  "argv0",
  "stdio",
  "detached",
  "uid",
  "gid",
  "serialization",
  "shell",
  "windowsVerbatimArguments",
  "windowsHide",
  "signal",
  "timeout",
  "killSignal",
];

/**
 * Spawns a rclone process to execute with the supplied arguments.
 *
 * The last argument can also be an object with all the flags.
 *
 * Options for the child process can also be passed into this last argument,
 * and they will be picked out.
 *
 * @param {...string|object} args arguments for the API call.
 * @returns {ChildProcess} the rclone subprocess.
 */
const api = function(...args) {
  let flags = args.pop();
  let childOptions = {};

  if (!!flags && flags.constructor === Object) {
    Object.entries(flags).forEach(([key, value]) => {
      if (CHILD_OPTIONS.indexOf(key) > -1) {
        childOptions[key] = value;
        return;
      }

      // No need to handle key when value is null or undefined.
      if (value == null) {
        return;
      }

      if (value === false) {
        key = `no-${ key }`;
      }
      const values = Array.isArray(value)? value : [value];
      values.forEach(value => {
        args.push(`--${ key }`);
        if (typeof value === "boolean") return;
        if (typeof value === "string") {
          args.push(`${ value }`);
        } else {
          args.push(`${ JSON.stringify(value) }`);
        }
      });
    });
  } else {
    // Not a flag object, push it back.
    args.push(flags);
  }

  return spawn(RCLONE_EXECUTABLE, args, childOptions);
}

// Promise-based API.
const promises = api.promises = function(...args) {
  return new Promise((resolve, reject) => {
    const subprocess = api(...args);

    subprocess.on("error", (error) => {
      reject(error);
    });

    const stdout = [], stderr = [];
    subprocess.stdout.on("data", (chunk) => {
      stdout.push(chunk);
    });
    subprocess.stdout.on("end", () => {
      resolve(Buffer.concat(stdout));
    });
    subprocess.stderr.on("data", (chunk) => {
      stderr.push(chunk);
    });
    subprocess.stderr.on("end", () => {
      if (stderr.length) {
        reject(Buffer.concat(stderr));
      }
    });
  });
};

const COMMANDS = [
  "about", // Get quota information from the remote.
  "authorize", // Remote authorization.
  "backend", // Run a backend specific command.
  "cat", // Concatenates any files and sends them to stdout.
  "check", // Checks the files in the source and destination match.
  "checksum", // Checks the files in the source against a SUM file.
  "cleanup", // Clean up the remote if possible.
  "config", // Enter an interactive configuration session.
  "config create", // Create a new remote with name, type and options.
  "config delete", // Delete an existing remote name.
  "config disconnect", // Disconnects user from remote
  "config dump", // Dump the config file as JSON.
  "config edit", // Enter an interactive configuration session.
  "config file", // Show path of configuration file in use.
  "config password", // Update password in an existing remote.
  "config providers", // List in JSON format all the providers and options.
  "config reconnect", // Re-authenticates user with remote.
  "config show", // Print (decrypted) config file, or the config for a single remote.
  "config update", // Update options in an existing remote.
  "config userinfo", // Prints info about logged in user of remote.
  "copy", // Copy files from source to dest, skipping already copied.
  "copyto", // Copy files from source to dest, skipping already copied.
  "copyurl", // Copy url content to dest.
  "cryptcheck", // Cryptcheck checks the integrity of a crypted remote.
  "cryptdecode", // Cryptdecode returns unencrypted file names.
  "dedupe", // Interactively find duplicate filenames and delete/rename them.
  "delete", // Remove the contents of path.
  "deletefile", // Remove a single file from remote.
  "genautocomplete", // Output completion script for a given shell.
  "genautocomplete bash", // Output bash completion script for rclone.
  "genautocomplete fish", // Output fish completion script for rclone.
  "genautocomplete zsh", // Output zsh completion script for rclone.
  "gendocs", // Output markdown docs for rclone to the directory supplied.
  "hashsum", // Produces a hashsum file for all the objects in the path.
  "help", // Show help for rclone commands, flags and backends.
  "link", // Generate public link to file/folder.
  "listremotes", // List all the remotes in the config file.
  "ls", // List the objects in the path with size and path.
  "lsd", // List all directories/containers/buckets in the path.
  "lsf", // List directories and objects in remote:path formatted for parsing.
  "lsjson", // List directories and objects in the path in JSON format.
  "lsl", // List the objects in path with modification time, size and path.
  "md5sum", // Produces an md5sum file for all the objects in the path.
  "mkdir", // Make the path if it doesn't already exist.
  "mount", // Mount the remote as file system on a mountpoint.
  "move", // Move files from source to dest.
  "moveto", // Move file or directory from source to dest.
  "ncdu", // Explore a remote with a text based user interface.
  "obscure", // Obscure password for use in the rclone config file.
  "purge", // Remove the path and all of its contents.
  "rc", // Run a command against a running rclone.
  "rcat", // Copies standard input to file on remote.
  "rcd", // Run rclone listening to remote control commands only.
  "rmdir", // Remove the path if empty.
  "rmdirs", // Remove empty directories under the path.
  "selfupdate", // Update the rclone binary.
  "serve", // Serve a remote over a protocol.
  "serve dlna", // Serve remote:path over DLNA
  "serve ftp", // Serve remote:path over FTP.
  "serve http", // Serve the remote over HTTP.
  "serve restic", // Serve the remote for restic's REST API.
  "serve sftp", // Serve the remote over SFTP.
  "serve webdav", // Serve remote:path over webdav.
  "settier", // Changes storage class/tier of objects in remote.
  "sha1sum", // Produces an sha1sum file for all the objects in the path.
  "size", // Prints the total size and number of objects in remote:path.
  "sync", // Make source and dest identical, modifying destination only.
  "test", // Run a test command.
  "touch", // Create new file or change file modification time.
  "tree", // List the contents of the remote in a tree like fashion.
  "version", // Show the version number.
];

COMMANDS.forEach(commandName => {
  // Normal API command to return a subprocess.
  Object.defineProperty(api, commandName, {
    /**
     * @param  {...string|object} args arguments for the API call
     * @returns {ChildProcess} the rclone subprocess.
     */
    value: function(...args) {
      return api(commandName, ...args);
    },
    enumerable: true,
  });

  // Promise API command to return a Promise.
  Object.defineProperty(promises, commandName, {
    /**
     * @param  {...string|object} args arguments for the API call
     * @returns {Promise<string>} the output of the command.
     */
    value: function(...args) {
      return promises(commandName, ...args);
    },
    enumerable: true,
  });
});

module.exports = api;
