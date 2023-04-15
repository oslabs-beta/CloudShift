/*
Generates more helpful error messages given various error messages from
cloud providers.
*/

const errorCredentialString = (field) => {
  return `Your ${field} is possibly incorrect. Please check your credentials and try again.`;
};

const errorGenerator = (error, serviceProvider) => {
  //The client side error message.
  let message = "";
  //The client side error field (when applicable).
  let field = "";

  //General errors.
  //System clock error.
  if (error.code === "RequestTimeTooSkewed")
    message = `Difference between ${serviceProvider} request time & current time is too large. Either resync your system clock or restart your computer to fix.`;

  //Cloudflare specific errors.
  if (serviceProvider === "Cloudflare") {
    //Invalid Access ID.
    if (error.code === "Unauthorized") {
      message = errorCredentialString("Access ID");
      field = "accessId";
    }
    //Invalid secret key.
    else if (error.code === "SignatureDoesNotMatch") {
      message = errorCredentialString("Secret Key");
      field = "secretKey";
    }
    //Invalid Account ID.
    else if (error.code === "UnknownEndpoint") {
      message = errorCredentialString("Account ID");
      field = "accountId";
    }
  }

  //Amazon specific errors.
  else if (serviceProvider === "AWS") {
    //Invalid Access ID.
    if (error.code === "InvalidAccessKeyId") {
      message = errorCredentialString("Access ID");
      field = "accessId";
    }
    //Invalid secret key.
    else if (error.code === "SignatureDoesNotMatch") {
      message = errorCredentialString("Secret Key");
      field = "secretKey";
    }
  }

  //Catch all error if nothing else works.
  if (!message.length)
    message = `An unknown error occurred when querying ${serviceProvider}. Error code ${error.code}.`;

  return { message, field };
};

module.exports = errorGenerator;
