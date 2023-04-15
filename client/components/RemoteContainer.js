import React from "react";
import { useSelector } from "react-redux";
import RemoteSelection from "./RemoteSelection";
import Remote from "./Remote";

export const RemoteContainer = (props) => {
  const { origin, destination } = useSelector((state) => state.GUI);

  return (
    <>
      <div className="grid grid-rows-1 grid-cols-2 mx-32 my-4 p-2">
        <div className="mx-20 my-0">
          {!origin.name ? (
            <RemoteSelection source={"Origin"}></RemoteSelection>
          ) : (
            <Remote
              remoteType={"origin"}
              accessIdHandler={accessIdHandler}
              secretKeyHandler={secretKeyHandler}
              displayName={origin.displayName}
            ></Remote>
          )}
        </div>

        <div className="mx-20 my-0">
          {!destination.name ? (
            <RemoteSelection source={"Destination"}></RemoteSelection>
          ) : (
            <Remote
              remoteType={"destination"}
              accessIdHandler={accessIdHandler}
              secretKeyHandler={secretKeyHandler}
              displayName={destination.displayName}
            />
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
  const isMicrosoftAccessId =
    remote.name === "azureblob" && !isAmazonAccessId && !isCloudflareAccessId
      ? true
      : false;
  if (isAmazonAccessId || isCloudflareAccessId || isMicrosoftAccessId) {
    return {
      ...remote,
      accessId: accessId.trim(),
      errorField: "",
    };
  } else {
    //this should probably just return a red check mark
    return {
      ...remote,
      accessId: "",
    };
  }
};

const secretKeyHandler = (e, remote) => {
  const secretKey = e.target.value;
  const isAmazonSecretKey =
    /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/.test(secretKey);
  const isCloudflareSecretKey = /^[a-z0-9]{64}$/.test(secretKey);
  const isMicrosoftSecretKey = /^[a-zA-Z0-9+/]{22,}={0,2}$/.test(secretKey);
  if (isAmazonSecretKey || isCloudflareSecretKey || isMicrosoftSecretKey) {
    return {
      ...remote,
      secretKey: secretKey.trim(),
      errorField: "",
    };
  } else {
    //this should probably just return a red check mark
    return {
      ...remote,
      secretKey: "",
    };
  }
};
