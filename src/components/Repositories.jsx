import { useState, useEffect } from "react";
import EmptyPage from "./EmptyPage";

function Repositories(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://api.github.com/users/${props.search}/repos?per_page=10`)
      .then((res) => (res.status === 200 ? res.json() : setError("err")))
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [props.search]);
  console.log(error);
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {
  return (
    <div className="repositories">
      {/* <h2>Repositories</h2> */}

      {error ? (
        <EmptyPage />
      ) : (
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
      )}
    </div>
  );
}

export default Repositories;
