import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import FAQSection from "../components/FAQSection";
import UsePopularMovies from "../hooks/usePopularMovies";
import CustomButton from "../components/CustomButton";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      "Phone number is not valid, must be in international format"
    ),
  message: yup.string().required("Message is required"),
});

const Support = () => {
  const images = UsePopularMovies().slice(0, 16);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log("Form Data Submitted:", data);
  };

  return (
    <>
      <section className='support'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 mb-5'>
              <h1 className='text-white mb-3'>Welcome to our support page!</h1>
              <p className='mb-5'>
                We're here to help you with any problems you may be having with
                our product.
              </p>
              <div className='support-imgs'>
                <div className='mosaic-background'>
                  {images.map((url, index) => (
                    <div key={index} className='mosaic-image'>
                      <img src={url} alt={`Movie poster ${index + 1}`} />
                    </div>
                  ))}
                </div>{" "}
              </div>
            </div>
            <div className='col-lg-8'>
              <form onSubmit={handleSubmit(onSubmit)} className='support-form'>
                <div className='row'>
                  <div className='col-md-6 mb-5'>
                    <label htmlFor='firstName' className='form-label'>
                      First Name
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      placeholder='Enter First Name'
                      className={`form-control ${
                        errors.firstName ? "is-invalid" : ""
                      }`}
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <div className='invalid-feedback'>
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 mb-5'>
                    <label htmlFor='lastName' className='form-label'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      placeholder='Enter Last Name'
                      className={`form-control ${
                        errors.lastName ? "is-invalid" : ""
                      }`}
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <div className='invalid-feedback'>
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 mb-5'>
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      placeholder='Enter your Email'
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className='invalid-feedback'>
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 mb-5'>
                    <label htmlFor='phone' className='form-label'>
                      Phone Number
                    </label>
                    <PhoneInput
                      international
                      defaultCountry='EG'
                      value={watch("phone")}
                      onChange={(value) => setValue("phone", value)}
                      className={`${errors.phone ? "is-invalid" : ""}`}
                    />
                    {errors.phone && (
                      <div className='invalid-feedback'>
                        {errors.phone.message}
                      </div>
                    )}
                  </div>
                  <div className='col-md-12 mb-5'>
                    <label htmlFor='message' className='form-label'>
                      Message
                    </label>
                    <textarea
                      id='message'
                      rows='4'
                      placeholder='Enter your Message'
                      className={`form-control ${
                        errors.message ? "is-invalid" : ""
                      }`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <div className='invalid-feedback'>
                        {errors.message.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-md-8 mb-4 mb-md-0'>
                    <label class='material-checkbox'>
                      <input type='checkbox' />
                      <span class='checkmark'></span>I agree with Terms of Use
                      and Privacy Policy
                    </label>
                  </div>
                  <div className='col-12 col-md-4'>
                    <CustomButton
                      type='submit'
                      label='Send Message'
                      className='custom-button float-end'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <FAQSection />
    </>
  );
};

export default Support;
