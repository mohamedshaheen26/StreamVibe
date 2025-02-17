import React, { useState } from "react";
import CustomButton from "./CustomButton";
import ToggleTabs from "./ToggleTabs";
const plans = [
  {
    title: "Basic Plan",
    monthlyPrice: "$9.99",
    yearlyPrice: "$99.99",
    features:
      "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
  },
  {
    title: "Standard Plan",
    monthlyPrice: "$12.99",
    yearlyPrice: "$129.99",
    features:
      "Access to a wider selection of movies and shows, including most new releases and exclusive content",
  },
  {
    title: "Premium Plan",
    monthlyPrice: "$14.99",
    yearlyPrice: "$149.99",
    features:
      "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
  },
];

const SubscriptionPlans = () => {
  const [activePlan, setActivePlan] = useState("Yearly");

  const planNames = ["Monthly", "Yearly"];

  return (
    <section className='subscription-plans' id='subscription-plans'>
      <div className='container'>
        <div className='d-flex flex-column align-items-end justify-content-between flex-xl-row'>
          <div className='content-left mb-4 mb-xl-0'>
            <h2>Choose the plan that's right for you</h2>
            <p>
              Join StreamVibe and select from our flexible subscription options
              tailored to suit your viewing preferences. Get ready for non-stop
              entertainment!
            </p>
          </div>
          <ToggleTabs
            tabs={planNames}
            activeTab={activePlan}
            onTabChange={(selectedTab) => setActivePlan(selectedTab)}
          />
        </div>
        <div className='plans row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch g-4'>
          {plans.map((plan, index) => (
            <div className='col' key={index}>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'>{plan.title}</h4>
                  <p className='card-text'>{plan.features}</p>
                  <p className='plan-price'>
                    <span>
                      {activePlan === "Yearly"
                        ? plan.yearlyPrice
                        : plan.monthlyPrice}
                    </span>
                    <span>
                      {activePlan === "Yearly" ? "/ year" : "/ month"}
                    </span>
                  </p>
                  <div className='buttons d-flex align-items-center justify-content-between'>
                    <CustomButton
                      className='custom-button free-trial-btn'
                      label='Start Free Trial'
                    />
                    <CustomButton
                      className='custom-button '
                      label='Choose Plan'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
