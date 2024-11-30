import React, { useState } from "react";
import SubscriptionPlans from "../components/SubscriptionPlans";
import ToggleTabs from "../components/ToggleTabs";
import useResposiveScreen from "../hooks/useResposiveScreen";

const subscriptions = () => {
  const isMobile = useResposiveScreen();
  const [activePlan, setActivePlan] = useState("Standard");

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
          hDR: "No",
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
          hDR: "Yes",
          dolbyAtmos: "Yes",
          adFree: "Yes",
          offlineViewing: "Yes, for select titles.",
          familySharing: "5 family members.",
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
          hDR: "Yes",
          dolbyAtmos: "Yes",
          adFree: "Yes",
          offlineViewing: "Yes, for all titles.",
          familySharing: "6 family members.",
        },
      },
    ],
  };

  // Extract plan names for the tabs
  const planNames = subscriptionPlans.plans.map((plan) => plan.name);

  return (
    <>
      <SubscriptionPlans className='p-5' />
      <section className='subscriptions'>
        <div className='container'>
          <h2 className='text-white mb-3'>
            Compare our plans and find the right one for you
          </h2>
          <p className='mb-5'>
            StreamVibe offers three different plans to fit your needs: Basic,
            Standard, and Premium. Compare the features of each plan and choose
            the one that's right for you.
          </p>
          {!isMobile ? (
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
                    {subscriptionPlans.plans.map((plan) => {
                      const featureKey = `${feature
                        .slice(0, 1)
                        .toLowerCase()}${feature
                        .slice(1)
                        .replace(/\s+/g, "")
                        .replace(/-/g, "")}`;

                      const featureValue = plan.details[featureKey] || "N/A";

                      return <td key={plan.name}>{featureValue}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <ToggleTabs
                tabs={planNames}
                activeTab={activePlan}
                onTabChange={(selectedTab) => setActivePlan(selectedTab)}
              />
              <div className='plan-details mt-4 p-3'>
                {subscriptionPlans.plans
                  .filter((plan) => plan.name === activePlan)
                  .map((plan) => (
                    <div key={plan.name}>
                      <div className='row'>
                        <div className='col-6 mb-4'>
                          <span className='plan-title'>Price</span>
                          <div>{plan.details.price}</div>
                        </div>
                        <div className='col-6 mb-4'>
                          <span className='plan-title'>Free Trial</span>
                          <div>{plan.details.freeTrial}</div>
                        </div>
                        <div className='col-12 mb-4'>
                          <span className='plan-title'>Content</span>
                          <div>{plan.details.content}</div>
                        </div>
                        <div className='col-12 mb-4'>
                          <span className='plan-title'>Devices</span>
                          <div>{plan.details.devices}</div>
                        </div>
                        <div className='col-6 mb-4'>
                          <span className='plan-title'>Cancel Anytime</span>
                          <div>{plan.details.cancelAnytime}</div>
                        </div>
                        <div className='col-6 mb-4'>
                          <span className='plan-title'>HDR</span>
                          <div>{plan.details.hdr}</div>
                        </div>
                        <div className='col-6 mb-4'>
                          <span className='plan-title'>Dolby Atmos</span>
                          <div>{plan.details.dolbyAtmos}</div>
                        </div>
                        <div className='col-6 mb-4'>
                          <span className='plan-title'>Ad-Free</span>
                          <div>{plan.details.adFree}</div>
                        </div>
                        <div className='col-6 mb-4'>
                          <span className='plan-title'>Offline Viewing</span>
                          <div>{plan.details.offlineViewing}</div>
                        </div>
                        <div className='col-6 mb-4'>
                          <span className='plan-title'>Family Sharing</span>
                          <div>{plan.details.familySharing}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default subscriptions;
