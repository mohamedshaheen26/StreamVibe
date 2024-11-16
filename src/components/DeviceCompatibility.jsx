import React from "react";
import useResposiveScreen from "../hooks/useResposiveScreen";

const devices = [
  {
    icon: <img src='../assets/Smartphones.png' />,
    title: "Smartphones",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <img src='../assets/Tablet.png' />,
    title: "Tablet",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <img src='../assets/SmartTV.png' />,
    title: "Smart TV",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <img src='../assets/Laptops.png' />,
    title: "Laptops",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <img src='../assets/GamingConsoles.png' />,
    title: "Gaming Consoles",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
  {
    icon: <img src='../assets/VRHeadsets.png' />,
    title: "VR Headsets",
    description:
      "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
  },
];

const DeviceCompatibility = () => {
  const isMobile = useResposiveScreen();

  const fullText =
    "With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.";

  const shortText =
    "With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere.";

  return (
    <section className='device-compatibility'>
      <div className='container'>
        <h2>We Provide You Streaming Experience Across Various Devices</h2>
        <p>{isMobile ? shortText : fullText}</p>
        <div className='cards row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
          {devices.map((device, index) => (
            <div className='col' key={index}>
              <div className='card h-100 text-center bg-secondary'>
                <div className='card-body text-start'>
                  <div className='d-flex align-items-center text-white'>
                    <span className='card-icon'>{device.icon}</span>
                    <h5 className='card-title mb-0'>{device.title}</h5>
                  </div>
                  <p className='card-text'>{device.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeviceCompatibility;
