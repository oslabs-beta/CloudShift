import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRemote } from "../slice";

const ResetButton = (props) => {
  const dispatch = useDispatch();
  const { remoteType } = props;

  const reset = () => {
    dispatch(resetRemote(remoteType));
  };

  return (
    <div>
      <button
        className="text-slate-500 hover:text-black hover:font-extrabold text-3xl focus:outline-none"
        onClick={reset}
      >
        {" \u27F3"}
      </button>
    </div>
  );
};

export default ResetButton;
