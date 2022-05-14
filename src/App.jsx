import React from "react";
//import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/svg/Logo.svg";
import searchIcon from "./assets/svg/search-icon.svg";
import InitialPage from "./components/InitialPage";
import pageSearch from "./assets/svg/initial-page-search.svg";
import MainPage from "./components/MainPage";
//import EmptyPage from "./components/EmptyPage";
import { useState } from "react";
import Repositories from "./components/Repositories";

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
            {/* <ul>
              <li>
                <Link to="/">link1</Link>
                <Link to="/main">link2</Link>
                <Link to="notfound">link3</Link>
              </li>
            </ul> */}
          </nav>
        </div>
      </header>
      <main className="main">
        {/* <div className="container"> */}
        {tempsearch ? (
          <MainPage search={tempsearch} />
        ) : (
          <InitialPage pageSearchIcon={pageSearch} />
        )}

        {/* {tempsearch ? <Repositories search={tempsearch} /> : null} */}

        {/* <EmptyPage /> */}
        {/* </div> */}
      </main>
    </div>
  );
};

export default App;
