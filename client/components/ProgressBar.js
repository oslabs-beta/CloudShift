import React from 'react'

const ProgressBar = () => {

    return (
    <div className="relative pt-1 w-2/5 ">
  <div className="flex mb-2 items-center justify-between">
    <div>
      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-stone-100 bg-emerald-300">
        Task in progress
      </span>
    </div>
    <div className="text-right">
      <span className="text-xs font-semibold inline-block text-black-600">
        30%
      </span>
    </div>
  </div>
  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100 w-full">
    <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-300"></div>
  </div>
</div>
    )
}

export default ProgressBar