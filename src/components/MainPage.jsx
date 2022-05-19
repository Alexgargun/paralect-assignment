import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import EmptyPage from "./EmptyPage";
import ReactPaginate from "react-paginate";
import PaginatedItems from "./PaginatedItems";
import followers from "../assets/svg/folovers.svg";
import following from "../assets/svg/foloving.svg";

let pagesSise = 4;

function MainPage({ search }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState([]);
  const [items, setItems] = useState([]);
  //const [page, setPage] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageOffset, setPageOffset] = useState(1);
  console.log(pageOffset);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${search}/repos?per_page=4&page=${pageOffset}`
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
          setPageCount(Math.ceil(result.public_repos / pagesSise));
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((err) => setError(err.message));
  }, [search, pageCount]);
  console.log(pageCount);

  let pagesCount = Math.ceil(context.public_repos / pagesSise);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  console.log(pages);

  let itemsOfTotalEnd = pagesSise * pageOffset;
  if (itemsOfTotalEnd > context.public_repos) {
    itemsOfTotalEnd = context.public_repos;
  }
  const itemsOfTotalStart = itemsOfTotalEnd - (pagesSise - 1);

  const handlePageClick = (event) => {
    setPageOffset(event.selected + 1);
  };

  // console.log(pages);
  // if(error) {
  //   setError(false)

  // }
  // if (error) {
  //   return <div>{error.message}</div>;
  // } else
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {error ? (
        <EmptyPage />
      ) : (
        <div>
          <div className="page-wrapper">
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
          {items.length === 0 ? null : (
            <div className="page-wrapper-pagination">
              <h3>
                {itemsOfTotalStart}-{itemsOfTotalEnd} of {context.public_repos}{" "}
                items
              </h3>
              <nav className="pagination">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  pageCount={pageCount}
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
// }

export default MainPage;
