import React from "react";
import { useDispatch } from "react-redux";

import awsIcon from "../public/aws_edited.png";
import azureIcon from "../public/azure.png";
import cloudflareIcon from "../public/cloudflare_edited.png";
import { updateRemoteName } from "../slice";

const RemoteSelection = (props) => {
  const dispatch = useDispatch();
  const { source } = props;

  const changeSourceHandler = (e) => {
    const displayNames = {
      azureblob: "Microsoft Storage Container",
      Cloudflare: "Cloudflare R2",
      AWS: "Amazon S3",
    };

    const name = e.target.id;
    const displayName = displayNames[name];

    dispatch(updateRemoteName({ name, source, displayName }));
  };

  return (
    <>
      <div class="grid grid-rows-5 items-center px-10">
        <div class="text-center text-base font-mono row-span-1">
          {props.source}
        </div>
        <div class="text-base flex justify-center align-top row-span-4">
          <button class="p-2" typeof="button" onClick={changeSourceHandler}>
            <img
              class="flex items-center mx-auto object-scale-down h-24 w-24"
              id="AWS"
              src={awsIcon}
              alt="aws"
            />
            AWS
          </button>
          <button class="p-2" typeof="button" onClick={changeSourceHandler}>
            <img
              class="flex items-center mx-auto object-scale-down h-24 w-24"
              id="Cloudflare"
              src={cloudflareIcon}
              alt="cloudflare"
            />
            Cloudflare
          </button>
          <button class="p-2" typeof="button" onClick={changeSourceHandler}>
            <img
              class="flex items-center mx-auto object-scale-down h-24 w-24"
              id="azureblob"
              src={azureIcon}
              alt="azure"
            />
            MS Azure
          </button>
        </div>
      </div>
    </>
  );
};

export default RemoteSelection;
