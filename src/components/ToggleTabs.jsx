import React from "react";

const ToggleTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='toggle-tabs d-flex justify-content-center'>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`btn ${activeTab === tab ? "active" : ""}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ToggleTabs;
