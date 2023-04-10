import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { migrationStatusChange, resetState } from '../slice';
import { deleteConfig } from '../services/deleteConfig';
const ProgressBar = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.GUI);

  //percentage for loading bar
  const transferVal = socket.dataTransferProgressPercent.length
    ? `${socket.dataTransferProgressPercent}%`
    : '0%';

  

   
  //Delete the config file once transfer is complete.
  useEffect(() => {
    if (transferVal === '100%') dispatch(deleteConfig());
  }, [transferVal]);

  //reset state and bring back to main page.
  const reset = () => {
    dispatch(migrationStatusChange(false));
    dispatch(resetState());
    document.querySelectorAll('input').forEach((input) => (input.value = ''));
  };

  const headingStyle = `${transferVal === '100%' ? "text-2xl" : "text-l"} font-semibold inline-block py-1 px-2 uppercase rounded-full text-stone-600`


  return (
    <>
      <div className="relative pt-1 w-2/5 h-screen">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <h1 className={headingStyle}>
              {transferVal === '100%'
                ? 'Transfer Complete'
                : 'Migration in progress'}
            </h1>
          </div>

          {transferVal === '100%' && (
            <button
              className=" w-28 h-10 text-stone-100 bg-cyan-400 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-xl px-5 py-1 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={reset}
            >
              OK
            </button>
          )}

          {transferVal !== '100%' && 
          
          <div className="text-right">
            <span className="text-s font-semibold inline-block text-black-600">
              {transferVal}
            </span>
          </div>
          }


        </div>

        {transferVal !== '100%' && 
        
        <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-2xl bg-cyan-200 w-full">
          <div
            style={{ width: transferVal }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-800`}
          ></div>
        </div>
        }
      
      </div>
    </>
  );
};

export default ProgressBar;
