import React, { useEffect } from "react";

const TrailerModal = ({ trailerUrl, onClose }) => {
  useEffect(() => {
    document.body.classList.add("body-no-scroll");

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, []);

  if (!trailerUrl) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-button' onClick={onClose}>
          <i className='fas fa-times'></i>
        </button>
        <div className='video-container'>
          <iframe
            width='100%'
            height='100%'
            src={`${trailerUrl}?autoplay=1`}
            title='Movie Trailer'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
