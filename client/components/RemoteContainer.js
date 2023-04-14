<<<<<<< HEAD
import React from "react";
import Origin from "./Origin";
import Destination from "./Destination";
import { useDispatch, useSelector } from "react-redux";
=======
import React from 'react';
import { useSelector } from 'react-redux';
import RemoteSelection from './RemoteSelection';
import Remote from './Remote';
>>>>>>> stretch

export const RemoteContainer = (props) => {
  const { origin, destination } = useSelector((state) => state.GUI);

  return (
    <>






      <div className="grid grid-rows-1 grid-cols-2 mx-32 my-16 p-6">
<<<<<<< HEAD
        <div class="mx-20 my-8">
          <Origin
            remoteType={"origin"}
            originAccessIdHandler={originAccessIdHandler}
            secretKeyHandler={originsecretKeyHandler}
            accountIdHandler={accountIdHandler}
            name={origin.name}
            service={origin.service}
          />
        </div>

        <div class="mx-20 my-8">
          {origin.accessId && origin.secretKey && origin.selectedBucket ? (
            <Destination
              remoteType={"destination"}
              accessIdHandler={destinationAccessIdHandler}
              secretKeyHandler={destinationSecretKeyHandler}
              accountIdHandler={accountIdHandler}
              name={destination.name}
              service={destination.service}
            />
          ) : (
            <div></div>
=======
        <div className="mx-20 my-8">
          {!origin.name ? (
            <RemoteSelection source={'Origin'}></RemoteSelection>
          ) : (
            <Remote
              remoteType={'origin'}
              accessIdHandler={accessIdHandler}
              secretKeyHandler={secretKeyHandler}
              displayName={origin.displayName}
            ></Remote>
          )}
        </div>

        <div className="mx-20 my-8">
          {!destination.name ? (
            <RemoteSelection source={'Destinaton'}></RemoteSelection>
          ) : (
            <Remote
              remoteType={'destination'}
              accessIdHandler={accessIdHandler}
              secretKeyHandler={secretKeyHandler}
              displayName={destination.displayName}
            />
>>>>>>> stretch
          )}
        </div>
      </div>
    </>
  );
};

const accessIdHandler = (e, remote) => {
  const accessId = e.target.value;
  const isAmazonAccessId = /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/.test(
    accessId
  );
  const isCloudflareAccessId = /^[a-z0-9]{32}$/.test(accessId);
<<<<<<< HEAD
  if (isAmazonAccessId || isCloudflareAccessId) {
    const provider = isAmazonAccessId ? "AWS" : "Cloudflare";
    const providerService = isAmazonAccessId ? "S3" : "R2";
    const destinationProvider = provider === "AWS" ? "Cloudflare" : "AWS";
    const destinationService = provider === "AWS" ? "R2" : "S3";
    return {
      origin: {
        ...origin,
        name: provider,
        accessId: accessId.trim(),
        service: providerService,
      },
      destination: {
        ...destination,
        name: destinationProvider,
        service: destinationService,
      },
=======
  const isMicrosoftAccessId =
    remote.name === 'azureblob' && !isAmazonAccessId && !isCloudflareAccessId
      ? true
      : false;
  if (isAmazonAccessId || isCloudflareAccessId || isMicrosoftAccessId) {
    return {
      ...remote,
      accessId: accessId.trim(),
      errorField: '',
>>>>>>> stretch
    };
  } else {
    //this should probably just return a red check mark
    return {
<<<<<<< HEAD
      origin: {
        ...origin,
        accessId: "",
        name: "",
      },
=======
      ...remote,
      accessId: '',
>>>>>>> stretch
    };
  }
};

const secretKeyHandler = (e, remote) => {
  const secretKey = e.target.value;
  const isAmazonSecretKey =
    /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/.test(secretKey);
  const isCloudflareSecretKey = /^[a-z0-9]{64}$/.test(secretKey);
<<<<<<< HEAD
  if (isAmazonSecretKey || isCloudflareSecretKey) {
    const provider = isAmazonSecretKey ? "AWS" : "Cloudflare";
    return {
      origin: {
        ...origin,
        name: provider,
        secretKey: secretKey.trim(),
      },
=======
  const isMicrosoftSecretKey = /^[a-zA-Z0-9+/]{22,}={0,2}$/.test(secretKey);
  if (isAmazonSecretKey || isCloudflareSecretKey || isMicrosoftSecretKey) {
    return {
      ...remote,
      secretKey: secretKey.trim(),
      errorField: '',
>>>>>>> stretch
    };
  } else {
    //this should probably just return a red check mark
    return {
<<<<<<< HEAD
      origin: {
        ...origin,
        secretKey: "",
      },
=======
      ...remote,
      secretKey: '',
>>>>>>> stretch
    };
  }
};

<<<<<<< HEAD
const destinationAccessIdHandler = (e, origin, destination) => {
  const accessId = e.target.value;
  const isValidAccessId =
    origin.name === "AWS"
      ? /^[a-z0-9]{32}$/.test(accessId)
      : /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/.test(accessId);
  if (isValidAccessId) {
    const provider = origin.name === "Cloudflare" ? "AWS" : "Cloudflare";
    return {
      destination: {
        ...destination,
        name: provider,
        accessId: accessId.trim(),
      },
    };
  } else {
    //this should probably just return a red check mark
    return { destination: { ...destination, accessId: "" } };
  }
};

const destinationSecretKeyHandler = (e, origin, destination) => {
  const secretKey = e.target.value;
  const isValidAccessId =
    origin.name === "AWS"
      ? /^[a-z0-9]{64}$/.test(secretKey)
      : /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/.test(
          secretKey
        );
  if (isValidAccessId) {
    const provider = origin.name === "Cloudflare" ? "AWS" : "Cloudflare";
    return {
      destination: {
        ...destination,
        name: provider,
        secretKey: secretKey.trim(),
      },
    };
  } else {
    //this should probably just return a red check mark
    return {
      destination: {
        ...destination,
        secretKey: "",
      },
    };
  }
};

const accountIdHandler = (e, origin, destination, parentComponent) => {
  if (parentComponent === "origin") {
    return {
      origin: { ...origin, accountId: e.target.value.trim() },
      destination: { ...destination },
    };
  } else {
    return {
      destination: { ...destination, accountId: e.target.value.trim() },
      origin: { ...origin },
    };
  }
};
=======
//async call using Amazon SDK to retrieve buckets and generate drop down menu

>>>>>>> stretch
