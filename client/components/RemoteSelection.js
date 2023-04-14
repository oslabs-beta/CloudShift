import React from "react";
import { useDispatch } from "react-redux";

import awsIcon from "../public/aws_edited.png";
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
      <h1>{props.source}</h1>
      <button typeof="button" onClick={changeSourceHandler}>
        <img id="AWS" src={awsIcon} alt="aws"></img>AWS
      </button>
      <button typeof="button" onClick={changeSourceHandler}>
        <img id="Cloudflare" src={cloudflareIcon} alt="cloudflare"></img>
        Cloudflare
      </button>
      <button typeof="button" onClick={changeSourceHandler}>
        <img id="azureblob" src={awsIcon} alt="azure"></img>MS Azure
      </button>
    </>
  );
};

export default RemoteSelection;
