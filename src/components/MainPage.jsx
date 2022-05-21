import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import userIcon from "../assets/svg/user.svg";
import followers from "../assets/svg/folovers.svg";
import following from "../assets/svg/foloving.svg";
import InitialPage from "./InitialPage";

function MainPage({ search }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState([]);
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const [itemsOfTotalStart, setItemsOfTotalStart] = useState(0);
  const pagesSise = 4;
  console.log(pageOffset);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${search}/repos?per_page=4&page=${
        pageOffset + 1
      }`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setError(null);
          setItemsOfTotalStart(pagesSise * (pageOffset + 1) - pagesSise);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [pageOffset, search]);

  useEffect(() => {
    fetch(` https://api.github.com/users/${search}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setContext(result);
          setError(null);
          setPageOffset(0);
          setPageCount(Math.ceil(result.public_repos / pagesSise));
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((err) => setError(err.message));
  }, [search, pageCount]);

  const handlePageClick = (event) => {
    setPageOffset(event.selected);
  };

  console.log(pageOffset);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  let pageWrapperClass = "page-wrapper";
  if (items.length === 0) {
    pageWrapperClass += " empty";
  }

  return (
    <div className="container">
      {error ? (
        <InitialPage textContent="User not found" pageIcon={userIcon} />
      ) : (
        <div>
          <div className={pageWrapperClass}>
            <div className="main-page-wrapper">
              <div className="main-page-image">
                <img src={context.avatar_url} alt="avatar" />
              </div>
              <h2>{context.name}</h2>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={context.html_url}
              >
                {context.login}
              </a>
              <div className="main-page-follow">
                <img src={followers} alt="followers" />
                <p>{context.followers} followers</p>
                <img src={following} alt="following" />
                <p>{context.following} following</p>
              </div>
            </div>
            <div className="repositories">
              <h2>Repositories ({context.public_repos})</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={item.html_url}
                    >
                      <p>{item.name}</p>
                      {item.description}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {context.public_repos < pagesSise ? null : (
            <div className="page-wrapper-pagination">
              <h3>
                {itemsOfTotalStart}-{itemsOfTotalStart + items.length} of{" "}
                {context.public_repos} items
              </h3>
              <nav className="pagination">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  pageCount={pageCount}
                  forcePage={pageOffset}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  activeClassName="button-selected"
                  containerClassName="pagination"
                  pageLinkClassName="pagination-button"
                  previousLinkClassName="prev-button"
                  nextLinkClassName="next-button"
                />
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MainPage;
