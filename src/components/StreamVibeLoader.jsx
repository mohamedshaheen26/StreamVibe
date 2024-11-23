import React from "react";

const StreamVibeLoader = () => {
  return (
    <div className='stream-vibe-loader'>
      <div className='loader-animation'>
        <img src='/assets/StreamVibeLogo.png' alt='StreamVibe Logo' />
        <p className='loader-text' data-text='StreamVibe'></p>
      </div>
    </div>
  );
};

export default StreamVibeLoader;
