const AWS = require("aws-sdk");

//Reset the config file. Prevents bugs within transfer services that relies on the AWS-SDK library.
const resetAWSConfig = (req, res, next) => {
  //Reset AWS config file if it's created.
  if (AWS.config.credentials) {
    AWS.config.credentials = null;
    //Make sure other properties are reset as well.
    if (AWS.config.signatureVersion) delete AWS.config.signatureVersion;
    if (AWS.config.endpoint) delete AWS.config.endpoint;
  }
  return next();
};

module.exports = resetAWSConfig;
