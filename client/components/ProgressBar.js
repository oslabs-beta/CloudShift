import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { migrationStatusChange } from '../slice';

const ProgressBar = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.GUI);
  const transferVal = socket.dataTransferProgressPercent.length
    ? `${socket.dataTransferProgressPercent}%`
    : '0%';

  //Flip migrating back to false if download complete.
  useEffect(() => {
    if (socket.dataTransferProgressPercent === '100')
      dispatch(migrationStatusChange(false));
  }, [socket.dataTransferProgressPercent]);

  return (
    <div className="relative pt-1 w-2/5 h-screen">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-stone-100 bg-emerald-300">
            Migration in progress
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-black-600">
            {transferVal}
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100 w-full">
        <div
          style={{ width: transferVal }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-300`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
