import React from "react";
import "./App.css";
import logo from "./assets/svg/Logo.svg";
import searchIcon from "./assets/svg/search-icon.svg";
import InitialPage from "./components/InitialPage";
import pageSearch from "./assets/svg/initial-page-search.svg";
import MainPage from "./components/MainPage";
import arrowLeft from "./assets/svg/arrow-left.svg";
import { useState } from "react";

const App = () => {
  const [tempsearch, setTempsearch] = useState("");

  console.log(tempsearch);
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <nav className="header-menu">
            <img className="App-logo" src={logo} alt="logo" />
            <div className="search-field">
              <img src={searchIcon} alt="search-icon" />
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value) {
                    setTempsearch(e.target.value);
                  }
                }}
                className="search-field-input"
                type="search"
                placeholder="Enter GitHub username"
              />
            </div>
          </nav>
        </div>
      </header>
      <main className="main">
        {tempsearch ? (
          <MainPage search={tempsearch} arrowLeft={arrowLeft} />
        ) : (
          <InitialPage pageSearchIcon={pageSearch} />
        )}
      </main>
    </div>
  );
};

export default App;
