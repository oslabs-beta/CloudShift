import React from 'react';
import { useSelector } from 'react-redux';
import aws_edited from '../public/aws_edited.png';
import cloudflare_edited from '../public/cloudflare_edited.png';


const Overlay = (props) => {
  const { origin, destination } = useSelector((state) => state.GUI);
  const originSrc = origin.name === 'Amazon' ? aws_edited : cloudflare_edited;
  const destinationSrc = destination.name === 'Amazon' ? aws_edited : cloudflare_edited;
  return (
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
    </div>
  );
};

export default Overlay;
