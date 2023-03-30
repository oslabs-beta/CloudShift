import React from 'react';
import Origin from './Origin';
import Destination from './Destination';
import { useDispatch, useSelector } from 'react-redux';

export const RemoteContainer = (props) => {
  const { origin, destination } = useSelector((state) => state.GUI);

  return (
    <>
      {' '}
      <Origin
        originAccessIdHandler={originAccessIdHandler}
        secretKeyHandler={originsecretKeyHandler}
        accountIdHandler={accountIdHandler}
        name={origin.name}
        service={origin.service}
      ></Origin>
      <div>
        {origin.accessId && origin.secretKey && (
          <Destination
            accessIdHandler={destinationAccessIdHandler}
            secretKeyHandler={destinationSecretKeyHandler}
            accountIdHandler={accountIdHandler}
            name={destination.name}
            service={destination.service}
          ></Destination>
        )}
      </div>
    </>
  );
};

const originAccessIdHandler = (e, origin, destination) => {
  const accessId = e.target.value;
  const isAmazonAccessId = /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/.test(
    accessId
  );
  const isCloudflareAccessId = /^[a-z0-9]{32}$/.test(accessId);
  //   const provider = checkInputCredentials(e.target.value);
  if (isAmazonAccessId || isCloudflareAccessId) {
    const provider = isAmazonAccessId ? 'Amazon' : 'CloudFlare';
    const providerService = isAmazonAccessId ? 'S3' : 'R2';
    const destinationProvider = provider === 'Amazon' ? 'CloudFlare' :'Amazon';
    const destinationService = provider === 'Amazon' ? 'R2' :'S3';
    return {
      origin: {
        ...origin,
        name: provider,
        accessId: accessId,
        service: providerService
      },
      destination: {
        ...destination,
        name: destinationProvider,
        service: destinationService
      }
    };
  } else {
    //this should probably just return a red check mark
    console.log('Credentials appear to be incorrect');
    return { origin: { ...origin } };
  }
};

const originsecretKeyHandler = (e, origin) => {
  const secretKey = e.target.value;
  const isAmazonSecretKey =
    /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/.test(secretKey);
  const isCloudflareSecretKey = /^[a-z0-9]{64}$/.test(secretKey);
  if (isAmazonSecretKey || isCloudflareSecretKey) {
    const provider = isAmazonSecretKey ? 'Amazon' : 'CloudFlare';
    return {
      origin: {
        ...origin,
        name: provider,
        secretKey: secretKey,
      },
    };
  } else {
    //this should probably just return a red check mark
    console.log('Credentials appear to be incorrect');
    return {
      origin: {
        ...origin,
      },
    };
  }
};

const destinationAccessIdHandler = (e, destination) => {
  const accessId = e.target.value;
  const isAmazonAccessId = /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/.test(
    accessId
  );
  const isCloudflareAccessId = /^[a-z0-9]{32}$/.test(accessId);
  //   const provider = checkInputCredentials(e.target.value);
  if (isAmazonAccessId || isCloudflareAccessId) {
    // const provider = isAmazonAccessId ? 'Amazon' : 'CloudFlare';
    return {
      destination: {
        ...destination,
        // name: provider,
        accessId: accessId,
      },
    };
  } else {
    //this should probably just return a red check mark
    console.log('Credentials appear to be incorrect');
    return { destination: { ...destination } };
  }
};

const destinationSecretKeyHandler = (e, destination) => {
  const secretKey = e.target.value;
  const isAmazonSecretKey =
    /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/.test(secretKey);
  const isCloudflareSecretKey = /^[a-z0-9]{64}$/.test(secretKey);
  if (isAmazonSecretKey || isCloudflareSecretKey) {
    const provider = isAmazonSecretKey ? 'Amazon' : 'CloudFlare';
    return {
      destination: {
        ...destination,
        name: provider,
        secretKey: secretKey,
      },
    };
  } else {
    //this should probably just return a red check mark
    console.log('Credentials appear to be incorrect');
    return {
      destination: {
        ...destination,
      },
    };
  }
};

const accountIdHandler = (e) => {

}

//these were formatter functions...

const updateOriginState = () => {};

const updatedDestinationState = () => {};

//original input credential checks...

const checkInputCredentials = (string) => {
  const isAmazonAccessId = /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/.test(string);
  const isAmazonSecretKey =
    /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/.test(string);

  const isCloudflareAccessId = /^[a-z0-9]{32}$/.test(string);
  const isCloudflareSecretKey = /^[a-z0-9]{64}$/.test(string);
  if (isAmazonAccessId || isAmazonSecretKey) {
    return 'Amazon';
  } else if (isCloudflareAccessId || isCloudflareSecretKey) {
    return 'CloudFlare';
  } else {
    return false;
  }
};

// const formatState = (
//   provider,
//   accessId,
//   secretKey,
//   accountId,
//   currentOrigin,
//   currentDestination
// ) => {
//   if (currentOrigin.name) {
//     const updatedDestination = Object.assign({}, currentDestination);
//     updatedDestination.accessId = accessId;
//     updatedDestination.secretKey = secretKey;
//     updatedDestination.accountId = accountId;
//     return {
//       origin: { ...currentOrigin },
//       destination: { ...updatedDestination },
//     };
//   }
//   if (provider === 'Amazon') {
//     return {
//       origin: {
//         name: provider,
//         accessId: accessId,
//         secretKey: secretKey,
//         accountId: null,
//         service: 'S3',
//       },
//       destination: {
//         render: true,
//         name: 'CloudFlare',
//         secretKey: null,
//         accessId: null,
//         accountId: null,
//         service: 'R2',
//       },
//     };
//   } else {
//     return {
//       origin: {
//         name: 'CloudFlare',
//         accessId: accessId,
//         secretKey: secretKey,
//         accountId: null,
//         service: 'R2',
//       },
//       destination: {
//         render: true,
//         name: provider,
//         secretKey: null,
//         accessId: null,
//         accountId: null,
//         service: 'S3',
//       },
//     };
//   }
// };
