const fs = require('fs');
const path = require('path');

const fsController = {
  config: (req, res, next) => {
    //WILL NEED AWS-SDK AND FLUSH OUT THE LOGIC HERE.
    let content = `[aws]
type = s3
provider = AWS
access_key_id = ${res.locals.awsAccessId}
secret_access_key = ${res.locals.awsSecretKey}
region = ${res.locals.awsRegion}`;

    content += `\n
[cloudflare]
type = s3
provider = Cloudflare
access_key_id = ${res.locals.cloudflareAccessId}
secret_access_key = ${res.locals.cloudflareSecretKey}
region = auto
endpoint = https://${res.locals.cloudflareAccountId}.r2.cloudflarestorage.com/`;

    fs.writeFileSync(path.resolve(__dirname, '../../rclone.conf'), content);
    return next();
  },

  removeConfig: (req, res, next) => {
    try {
      fs.unlinkSync(path.resolve(__dirname, '../../rclone.conf'));
      return next();
    } catch {
      return next({
        log: error.message,
        message:
          'Error removing rclone config file. See server console for details.'
      });
    }
  }
};

module.exports = fsController;
