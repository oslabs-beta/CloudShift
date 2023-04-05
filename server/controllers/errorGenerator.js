/*
Generates more helpful error messages given various error messages from
cloud providers.
*/

const errorGenerator = (error, serviceProvider) => {
  let errorLogString = '';

  //Cloudflare specific errors.
  //Invalid Access ID.
  if (error.code === 'Unauthorized')
    errorLogString =
      'Your Access ID is possibly incorrect. Please check your credentials and try again. See terminal for full error message."';
  //Invalid password.
  else if (error.code === 'SignatureDoesNotMatch')
    errorLogString =
      'Your Secret Key is possibly incorrect. Please check your credentials and try again. See terminal for full error message."';
  //Invalid Account ID.
  else if (error.code === 'UnknownEndpoint')
    errorLogString =
      'Your Account ID is possibly incorrect. Please check your credentials and try again. See terminal for full error message."';
  console.log('FULL ERROR: ', error);
  return errorLogString;
};

module.exports = errorGenerator;
