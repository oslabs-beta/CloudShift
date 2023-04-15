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
        className="text-white bg-[#009bf9] hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800"
        onClick={reset}
      >
        Reset {remoteType.charAt(0).toUpperCase() + remoteType.slice(1)}
      </button>
    </div>
  );
};

export default ResetButton;
