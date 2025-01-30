import React from 'react';
import Gif from '../assets/walking.webp';

const WalkingGif = ({ width, height }) => {
  return (
    <img
      src={Gif}
      alt="Walking"
      style={{
        width: width ?? '100px',
        height: height ?? '100px',
        margin: '8px',
      }}
    />
  );
};

export default WalkingGif;
