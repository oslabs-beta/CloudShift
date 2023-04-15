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
      <div className="flex flex-col">
        <div className="text-center text-base font-mono row-span-1">
          {props.source}
        </div>
        <div className="text-base flex flex-col justify-center align-top">
          <button
            className="p-2 group"
            typeof="button"
            onClick={changeSourceHandler}
          >
            <img
              className="flex items-center mx-auto object-scale-down h-24 w-24 hover:scale-150 transition-all duration-500 cursor-pointer"
              id="AWS"
              src={awsIcon}
              alt="aws"
            />
            <span className="group-hover:underline underline-offset-8">
              AWS
            </span>
          </button>
          <button
            className="p-2 group"
            typeof="button"
            onClick={changeSourceHandler}
          >
            <img
              className="flex items-center mx-auto object-scale-down h-24 w-24 hover:scale-150 transition-all duration-500 cursor-pointer"
              id="Cloudflare"
              src={cloudflareIcon}
              alt="cloudflare"
            />
            <span className="group-hover:underline underline-offset-8">
              Cloudflare
            </span>
          </button>
          <button
            className="p-2 group"
            typeof="button"
            onClick={changeSourceHandler}
          >
            <img
              className="flex items-center mx-auto object-scale-down h-24 w-24 hover:scale-150 transition-all duration-500 cursor-pointer"
              id="azureblob"
              src={azureIcon}
              alt="azure"
            />
            <span className="group-hover:underline underline-offset-8">
              MS Azure
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RemoteSelection;
