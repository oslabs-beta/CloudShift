// Custom command to selfupdate rclone binary.

const { existsSync } = require("fs");
const { join } = require("path");
const https = require("https");

let { platform, arch } = process;

switch (platform) {
  case "darwin":
    platform = "osx";
    break;
  case "freebsd":
  case "linux":
  case "openbsd":
    break;
  case "sunos":
    platform = "solaris";
  case "win32":
    platform = "windows";
  default:
    break;
}

switch (arch) {
  case "arm":
  case "arm64":
  case "mips":
  case "mipsel":
    break;
  case "x32":
    arch = "386";
  case "x64":
    arch = "amd64";
  default:
    break;
}

/**
 * Fetches a remote URL
 * @param {string} url the remote URL to fetch.
 * @returns {Promise<Buffer>} the response as Buffer.
 */
async function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    }).on("error", reject);
  });
}

const RCLONE_DIR = join(__dirname, "..", "bin");
const DEFAULT_RCLONE_EXECUTABLE = join(RCLONE_DIR, `rclone${ platform === "windows"? ".exe" : "" }`);
const {
  RCLONE_EXECUTABLE = DEFAULT_RCLONE_EXECUTABLE,
} = process.env;

/**
 * Updates rclone binary based on current OS.
 * @returns {Promise}
 */
module.exports = function(options = {}) {
  const {
    beta = false,
    stable = !beta,
    version,
    check = false,
  } = options;

  // Passes along to `rclone` if exists.
  if (existsSync(RCLONE_EXECUTABLE)) {
    return this.selfupdate(options);
  }

  const baseUrl = stable ? "https://downloads.rclone.org" : "https://beta.rclone.org";
  const channel = stable ? "current" : "beta-latest";

  if (check) {
    return fetch(`${ baseUrl }/version.txt`).then(version => {
      console.log(`The latest version is ${ version }`);
    });
  }

  console.log("Downloading rclone...");
  const archiveName = version ? `${ version }/rclone-${ version }` : `rclone-${ channel }`;
  return fetch(`${ baseUrl }/${ archiveName }-${ platform }-${ arch }.zip`).then(archive => {
    console.log("Extracting rclone...");
    const AdmZip = require("adm-zip");
    const { chmodSync } = require("fs");

    const zip = new AdmZip(archive);
    zip.getEntries().forEach((entry) => {
      const { name, entryName } = entry;
      if (/rclone(\.exe)?$/.test(name)) {
        zip.extractEntryTo(entry, RCLONE_DIR, false, true);
        // Make it executable.
        chmodSync(DEFAULT_RCLONE_EXECUTABLE, 0o755);

        console.log(`${ entryName.replace(`/${ name }`, "") } is installed.`);
      }
    });
  });
}
