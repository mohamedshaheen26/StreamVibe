import React from "react";
import CustomButton from "./CustomButton";
import usePopularMovies from "@/hooks/usePopularMovies";

const FreeTrial = () => {
  const images = usePopularMovies();

  return (
    <div className='container'>
      <section className='free-trial'>
        <div className='mosaic-background'>
          {images.map((url, index) => (
            <div key={index} className='mosaic-image'>
              <img src={url} alt={`Movie poster ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className='row'>
          <div className='col-md-9 text-center text-md-start'>
            <h2 className='mb-3'>Start your free trial today!</h2>
            <p>
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
          </div>
          <div className='col-md-3'>
            <CustomButton
              className='custom-button free-trial-btn float-end'
              label='Start a Free Trial'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeTrial;
