import React, { useEffect } from "react";
import { updateSecretKey, updateAccessId, updateAccountId } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import BucketSelect from "./BucketSelect";
import { getUserBuckets } from "../services/getBuckets";
import ErrorDisplay from "./ErrorDisplay";
import StartMigrationButton from "./MigrationButton";
import ResetButton from "./ResetButton";

const Remote = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

  let { remoteType } = props;

  const remote = remoteType === "origin" ? origin : destination;

  let bucketSelect;

  const requireAccountId = remote.name === "Cloudflare" ? true : false;

  if (!requireAccountId) {
    bucketSelect = remote.accessId && remote.secretKey && (
      <BucketSelect remote={remoteType}></BucketSelect>
    );
  } else {
    bucketSelect = remote.accessId && remote.secretKey && remote.accountId && (
      <BucketSelect remote={remoteType}></BucketSelect>
    );
  }

  //Get the list of buckets if all credentials are present.
  useEffect(() => {
    if (!remote.accessId || !remote.secretKey) return;
    if (remote.name === "Cloudflare" && !remote.accountId) return;
    dispatch(getUserBuckets({ ...remote, originOrDestination: remoteType }));
  }, [remote.accessId, remote.secretKey, remote.name, remote.accountId]);

  useEffect(() => {
    if (remote.accessId) {
      document.querySelector(`#${remoteType}SecretKey`).focus();
    }
  }, [remote.accessId]);

  useEffect(() => {
    if (remote.secretKey && remote.name === "Cloudflare") {
      document.querySelector(`#${remoteType}accountId`).focus();
    }
  }, [remote.secretKey]);

  let correctInputClass =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  let wrongInputClass =
    "block py-2.5 px-0 w-full text-sm text-red-600 bg-transparent border-0 border-b-2 border-red-600 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer";

  return (
    <div>
      <div className="relative z-0 w-full h-full mb-6 group">
        <div class="grid grid-cols-1 gap-2 items-center">
          <div class="mx-auto text-sm flex items-center font-mono">
            {props.remoteType.charAt(0).toUpperCase() +
              props.remoteType.slice(1)}
            : {props.displayName}
          </div>
        </div>
      </div>

      <div className="relative z-0 w-full h-full mb-6 group">
        <input
          type="key"
          autoFocus
          className={remote.errorMessage ? wrongInputClass : correctInputClass}
          placeholder=" "
          required
          name="accessId"
          id={`${remoteType}AccessId`}
          onChange={(e) => {
            const newState = props.accessIdHandler(e, remote);
            dispatch(updateAccessId({ newState, remoteType }));
          }}
        ></input>
        <label
          htmlFor={`${remoteType}AccessId`}
          className={`${
            remote.errorMessage
              ? "text-red-600 peer-focus:text-red-600"
              : "peer-focus:text-blue-600"
          } peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          {remote.name === "azureblob" ? "Account ID" : "Access ID"}
          {remote.accessId ? <>{" \u2705"}</> : <></>}
        </label>
      </div>

      <div className="block relative z-0 w-full h-full mb-6 group">
        <input
          className={remote.errorMessage ? wrongInputClass : correctInputClass}
          placeholder=" "
          required
          type="key"
          name="secretKey"
          id={`${remoteType}SecretKey`}
          onChange={(e) => {
            const newState = props.secretKeyHandler(e, remote);
            dispatch(updateSecretKey({ newState, remoteType }));
          }}
        ></input>

        <label
          htmlFor="secretKey"
          className={`${
            remote.errorMessage
              ? "text-red-600 peer-focus:text-red-600"
              : "peer-focus:text-blue-600"
          } peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          {remote.name === "azureblob" ? "Access Key" : "Secret Key"}
          {remote.secretKey ? <>{" \u2705"}</> : <></>}
        </label>
      </div>

      {remote.name === "Cloudflare" && (
        <div className="relative z-0 w-full h-full mb-6 group">
          <input
            className={
              remote.errorMessage ? wrongInputClass : correctInputClass
            }
            placeholder=" "
            required
            type="id"
            id={`${remoteType}accountId`}
            name="accountId"
            onChange={(e) => {
              dispatch(
                updateAccountId({
                  accountId: e.target.value.trim(),
                  remoteType,
                })
              );
            }}
          ></input>
          <label
            htmlFor="accountId"
            className={`${
              remote.errorMessage
                ? "text-red-600 peer-focus:text-red-600"
                : "peer-focus:text-blue-600"
            } peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
          >
            Account ID {remote.accountId.length === 32 && <>{"\u2705"}</>}
          </label>
        </div>
      )}

      {remote.errorMessage ? (
        <ErrorDisplay></ErrorDisplay>
      ) : (
        <div className="relative z-0 w-full h-full mb-6 group">
          {bucketSelect}
        </div>
      )}

      <ResetButton remoteType={remoteType}></ResetButton>

      {origin.selectedBucket &&
      destination.selectedBucket &&
      remoteType === "destination" ? (
        <StartMigrationButton></StartMigrationButton>
      ) : null}
    </div>
  );
};

export default Remote;