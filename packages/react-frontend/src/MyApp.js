import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          res.json().then((data) => {
            setCharacters([...characters, data]);
          });
        } else {
          console.log("Creation failed.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUser(userIdToDelete) {
    const promise = fetch("http://localhost:8000/users/" + userIdToDelete, {
      method: "DELETE",
    });
    return promise;
  }

  function removeOneCharacter(userIdToDelete, index) {
    console.log("hjhjh");
    deleteUser(userIdToDelete)
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter(
            (character) => character._id !== userIdToDelete
          );
          setCharacters(updated);
        } else {
          console.log("Deletion failed.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
