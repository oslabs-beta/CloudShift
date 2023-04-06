import React from 'react';
import { useSelector } from 'react-redux';
import aws_edited from '../public/aws_edited.png';
import cloudflare_edited from '../public/cloudflare_edited.png';
import ReactDOM from "react-dom"
import ProgressBar from './ProgressBar'


const Overlay = (props) => {
  const { origin, destination } = useSelector((state) => state.GUI);
  const originSrc = origin.name === 'AWS' ? aws_edited : cloudflare_edited;
  const destinationSrc = destination.name === 'AWS' ? aws_edited : cloudflare_edited;
  return ReactDOM.createPortal(
    <>
      {/* <div className='flex justify-center item-center fixed z-10 h-screen w-screen bg-transparent left-0 top-0 py-52 '>
      <div className='flex'>
        <section>
          <h2>{origin.name}</h2>
          <img src={originSrc} alt="origin logo"></img>
        </section>
          <h1>TO>>>>>></h1>
        <section>
          <h2>{destination.name}</h2>
          <img src={destinationSrc} alt='destination logo'></img>
        </section>
      </div>   
</div> */}
      <div className='flex left-0 top-0 justify-center item-center fixed z-9999 h-screen w-screen backdrop-blur-xl'>
        <div className=' w-screen h-screen flex justify-center item-center py-72'>

          <ProgressBar></ProgressBar>

        </div>
      </div>
    </>,
    document.querySelector('#portal')
  );
};

export default Overlay;


// display: none; /* Hidden by default */
//   position: fixed; /* Stay in place */
//   z-index: 1; /* Sit on top */
//   left: 0;
//   top: 0;
//   width: 100%; /* Full width */
//   height: 100%; /* Full height */
//   overflow: auto; /* Enable scroll if needed */
//   background-color: rgb(0,0,0); /* Fallback color */
//   background-color: rgba(0,0,0,0.4);