import React from 'react';
import { useSelector } from 'react-redux';
import aws_edited from '../public/aws_edited.png';
import cloudflare_edited from '../public/cloudflare_edited.png';
import ReactDOM from 'react-dom';
import ProgressBar from './ProgressBar';

const Overlay = (props) => {
  const { origin, destination } = useSelector((state) => state.GUI);
  const originSrc = origin.name === 'AWS' ? aws_edited : cloudflare_edited;
  const destinationSrc =
    destination.name === 'AWS' ? aws_edited : cloudflare_edited;
  return ReactDOM.createPortal(
    <>
      <div className="flex left-0 top-0 justify-center item-center fixed z-9999 h-screen w-screen backdrop-blur-xl">
        <div className=" w-screen h-screen flex justify-center item-center py-72">
          <ProgressBar></ProgressBar>
        </div>
      </div>
    </>,
    document.querySelector('#portal')
  );
};

export default Overlay;
