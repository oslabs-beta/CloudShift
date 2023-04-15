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
        className="text-slate-500 hover:text-black hover:font-extrabold text-3xl dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
        onClick={reset}
      >
        {" \u27F3"}
      </button>
    </div>
  );
};

export default ResetButton;
