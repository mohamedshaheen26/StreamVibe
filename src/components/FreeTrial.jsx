import React from "react";
import CustomButton from "./CustomButton";
import usePopularMovies from "@/hooks/usePopularMovies";

const FreeTrial = () => {
  const images = usePopularMovies();

  return (
    <div className='container free-trial-section'>
      <section className='free-trial'>
        <div className='mosaic-background'>
          {images.map((url, index) => (
            <div key={index} className='mosaic-image'>
              <img src={url} alt={`Movie poster ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className='row align-items-center'>
          <div className='col-lg-9 mb-5 mb-lg-0 text-center text-lg-start'>
            <h2 className='mb-3'>Start your free trial today!</h2>
            <p>
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
          </div>
          <div className='col-lg-3 d-flex justify-content-center'>
            <CustomButton
              className='custom-button free-trial-btn float-lg-end'
              label='Start a Free Trial'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeTrial;
