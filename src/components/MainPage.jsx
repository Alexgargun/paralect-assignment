import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function MainPage(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  //   console.log(context);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  useEffect(() => {
    console.log("sync title");
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  useEffect(() => {
    console.log(props.search);
    fetch(` https://api.github.com/users/${props.search}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setContext(result);
          console.log(result);
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
  console.log(context);
  //console.log(selectedUser);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
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
          <ul>
            {/* {context.map(({ login, id }) => (
            <li
              key={id}
              onClick={() => {
                setSelectedUser(login);
              }}
            >
              {login}
            </li>
          ))} */}
            {/* {context.map(({ user }) => {
            return <li key={user.id}>{user.login}</li>;
          })} */}
          </ul>
        </div>
      </>
    );
  }
}

export default MainPage;
