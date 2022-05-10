import { useState, useEffect } from "react";

function Repositories(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://api.github.com/users/${props.search}/repos`)
      .then((res) => res.json())
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

  console.log(items);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="repositories">
        <h2>Repositories {items.length}</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Repositories;
