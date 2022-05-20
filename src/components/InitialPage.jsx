import React from "react";

const InitialPage = ({ pageIcon, textContent }) => {
  return (
    <div className="initial-page-wrapper">
      <div className="initial-page-content">
        <img src={pageIcon} alt="page-search" />
        <h2 className="initial-text-content">{textContent}</h2>
      </div>
    </div>
  );
};

export default InitialPage;
