import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import EmptyPage from "./EmptyPage";
import ReactPaginate from "react-paginate";

function PaginatedItems(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  console.log(pageOffset);

  useEffect(async () => {
    const response = await fetch(
      `https://api.github.com/users/${props.search}/repos?per_page=4&page=${pageOffset}`
    );
    console.log(response);
    const responseJson = await response.json();
    if (!response.ok) {
      setError(responseJson.message);
      setIsLoaded(true);
      setItems([]);
      setPageCount(0);
      return;
    }
    const endOffset = itemOffset + props.itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setItems(responseJson.slice(itemOffset, endOffset));
    setError(null);
    setIsLoaded(false);
    setPageCount(Math.ceil(props.context.publicRepos / props.itemsPerPage));
    //setPageCount(130);
  }, [
    props.search,
    pageOffset,
    pageCount,
    props.itemsPerPage,
    props.publicRepos,
  ]);

  const handlePageClick = (event) => {
    // const newOffset = (event.selected * props.itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setPageOffset(event.selected);
  };

  console.log(items);

  let pagesSise = 4;
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
  if (items.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        There's no repositories.
      </div>
    );
  }
  return (
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
  );
}
// }

export default PaginatedItems;
