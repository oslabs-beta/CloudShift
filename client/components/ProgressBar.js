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
          <span className="text-l font-semibold inline-block py-1 px-2 uppercase rounded-full text-stone-100 bg-cyan-400">
            Migration in progress
          </span>
        </div>
        <div className="text-right">
          <span className="text-s font-semibold inline-block text-black-600">
            {transferVal}
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-2xl bg-cyan-200 w-full">
        <div
          style={{ width: transferVal }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-800`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
