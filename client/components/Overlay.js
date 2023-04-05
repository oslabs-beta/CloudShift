import React from 'react';
import { useSelector } from 'react-redux';
import aws_edited from '../public/aws_edited.png';
import cloudflare_edited from '../public/cloudflare_edited.png';
import ReactDOM from "react-dom" 


const Overlay = (props) => {
  const { origin, destination } = useSelector((state) => state.GUI);
  const originSrc = origin.name === 'AWS' ? aws_edited : cloudflare_edited;
  const destinationSrc = destination.name === 'AWS' ? aws_edited : cloudflare_edited;
  return ReactDOM.createPortal(
    <div>
      <div>
        <section>
          <h2>{origin.name}</h2>
          <img src={originSrc} alt="origin logo"></img>
        </section>
        <section>
          <h2>{destination.name}</h2>
          <img src={destinationSrc} alt='destination logo'></img>
        </section>
        <p>placeholder for progress bar</p>
      </div>
    </div>,
    document.querySelector('#portal')
  );
};

export default Overlay;
