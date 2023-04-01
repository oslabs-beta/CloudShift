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
        remoteType={'origin'}
        originAccessIdHandler={originAccessIdHandler}
        secretKeyHandler={originsecretKeyHandler}
        accountIdHandler={accountIdHandler}
        name={origin.name}
        service={origin.service}
      ></Origin>
      <div>
        {origin.accessId && origin.secretKey && (
          <Destination
            remoteType={'destination'}
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
  if (isAmazonAccessId || isCloudflareAccessId) {
    const provider = isAmazonAccessId ? 'Amazon' : 'CloudFlare';
    const providerService = isAmazonAccessId ? 'S3' : 'R2';
    const destinationProvider = provider === 'Amazon' ? 'CloudFlare' : 'Amazon';
    const destinationService = provider === 'Amazon' ? 'R2' : 'S3';
    return {
      origin: {
        ...origin,
        name: provider,
        accessId: accessId,
        service: providerService,
      },
      destination: {
        ...destination,
        name: destinationProvider,
        service: destinationService,
      },
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

const destinationAccessIdHandler = (e, origin, destination) => {
  const accessId = e.target.value;
  const isValidAccessId =
    origin.name === 'Amazon'
      ? /^[a-z0-9]{32}$/.test(accessId)
      : /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/.test(accessId);
  if (isValidAccessId) {
    const provider = origin.name === 'CloudFlare' ? 'Amazon' : 'CloudFlare';
    return {
      destination: {
        ...destination,
        name: provider,
        accessId: accessId,
      },
    };
  } else {
    //this should probably just return a red check mark
    console.log('Credentials appear to be incorrect');
    return { destination: { ...destination } };
  }
};

const destinationSecretKeyHandler = (e, origin, destination) => {
  const secretKey = e.target.value;
  const isValidAccessId =
    origin.name === 'Amazon'
      ? /^[a-z0-9]{64}$/.test(secretKey)
      : /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/.test(
          secretKey
        );
  if (isValidAccessId) {
    const provider = origin.name === 'CloudFlare' ? 'Amazon' : 'CloudFlare';
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

const accountIdHandler = (e, origin, destination, parentComponent) => {
  console.log(e.target, parentComponent);
  if (parentComponent === 'origin') {
    return {
      origin: { ...origin, accountId: e.target.value },
      destination: { ...destination },
    };
  } else {
    return {
      destination: { ...destination, accountId: e.target.value },
      origin: { ...origin },
    };
  }
};