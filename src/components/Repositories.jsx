import { useState, useEffect } from "react";
import EmptyPage from "./EmptyPage";

function Repositories(props) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://api.github.com/users/${props.search}/repos?per_page=10`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })

      .then((result) => {
        setIsLoaded(true);
        setItems(result);
        setError(false);
      })
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      .catch((err) => setError(err.message));
  }, [props.search]);
  console.log(error);
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {
  return (
    <div className="repositories">
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
