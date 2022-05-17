import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import EmptyPage from "./EmptyPage";

function MainPage(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState([]);
  console.log(page);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${props.search}/repos?per_page=5&page=${page}`
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [page, props.search]);

  useEffect(() => {
    console.log(props.search);
    fetch(` https://api.github.com/users/${props.search}`)
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
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((err) => setError(err.message));
  }, [props.search]);
  console.log(items);

  let pagesSise = 5;
  let pagesCount = Math.ceil(context.public_repos / pagesSise);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

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
  // else {

  console.log(error);
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
              <h3>{context.login}</h3>
              <div className="main-page-follow">
                <p>{context.followers} followers</p>
                <p>{context.following} following</p>
              </div>
            </div>
            <div className="repositories">
              <h2>Repositories ({context.public_repos})</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <a href={item.html_url}>
                      <p>{item.name}</p>
                      {item.description}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="page-wrapper-pagination">
            <nav className="pagination">
              <h3>5-8 of {context.public_repos} items</h3>
              {pages.map((p) => (
                <button key={p} onClick={() => setPage(p)}>
                  {p}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
// }

export default MainPage;
