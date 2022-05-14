import React from "react";

const InitialPage = (props) => {
  return (
    <div className="initial-page-wrapper">
      <div className="initial-page-content">
        <img src={props.pageSearchIcon} alt="page-search" />
        <h2>Start with searching a GitHub user</h2>
      </div>
    </div>
  );
};

export default InitialPage;
