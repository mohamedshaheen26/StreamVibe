import React from "react";
import SubscriptionPlans from "../components/SubscriptionPlans";

const subscriptions = () => {
  const subscriptionPlans = {
    features: [
      "Price",
      "Content",
      "Devices",
      "Free Trial",
      "Cancel Anytime",
      "HDR",
      "Dolby Atmos",
      "Ad-Free",
      "Offline Viewing",
      "Family Sharing",
    ],
    plans: [
      {
        name: "Basic",
        details: {
          price: "$9.99/Month",
          content:
            "Access to a wide selection of movies and shows, including some new releases.",
          devices: "Watch on one device simultaneously",
          freeTrial: "7 Days",
          cancelAnytime: "Yes",
          hdr: "No",
          dolbyAtmos: "No",
          adFree: "No",
          offlineViewing: "No",
          familySharing: "No",
        },
      },
      {
        name: "Standard",
        tag: "Popular",
        details: {
          price: "$12.99/Month",
          content:
            "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
          devices: "Watch on two devices simultaneously",
          freeTrial: "7 Days",
          cancelAnytime: "Yes",
          hdr: "Yes",
          dolbyAtmos: "Yes",
          adFree: "Yes",
          offlineViewing: "Yes, for select titles.",
          familySharing: "Yes, up to 5 family members.",
        },
      },
      {
        name: "Premium",
        details: {
          price: "$14.99/Month",
          content:
            "Access to the widest selection of movies and shows, including all new releases and offline viewing.",
          devices: "Watch on four devices simultaneously",
          freeTrial: "7 Days",
          cancelAnytime: "Yes",
          hdr: "Yes",
          dolbyAtmos: "Yes",
          adFree: "Yes",
          offlineViewing: "Yes, for all titles.",
          familySharing: "Yes, up to 6 family members.",
        },
      },
    ],
  };

  // Map feature name to the key in the details object
  const mapFeatureToKey = (feature) => {
    return feature
      .trim() // Remove leading/trailing spaces
      .replace(/\s+/g, "") // Remove all spaces
      .replace(/-/g, "") // Remove dashes
      .toLowerCase(); // Convert to lowercase
  };

  return (
    <>
      <SubscriptionPlans className='p-5' />
      <section className='subscriptions'>
        <div className='container'>
          <h2 className="text-white mb-3">Compare our plans and find the right one for you</h2>
          <p className="mb-5">
            StreamVibe offers three different plans to fit your needs: Basic,
            Standard, and Premium. Compare the features of each plan and choose
            the one that's right for you.
          </p>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Features</th>
                {subscriptionPlans.plans.map((plan) => (
                  <th key={plan.name} className='w-25'>
                    {plan.name}
                    {plan.tag && (
                      <span className='badge bg-danger ms-2'>{plan.tag}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscriptionPlans.features.map((feature, index) => (
                <tr key={index}>
                  <td>{feature}</td>
                  {subscriptionPlans.plans.map((plan, planIndex) => {
                    const featureKey = mapFeatureToKey(feature);
                    const featureValue = plan.details[featureKey] || "N/A";
                    return <td key={planIndex}>{featureValue}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default subscriptions;
