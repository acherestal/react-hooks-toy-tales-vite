// src/components/App.jsx
import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET all toys on startup
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
      });
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // POST: add a new toy
  function handleAddToy(formData) {
    const newToyToSend = {
      ...formData,
      likes: 0,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToyToSend),
    })
      .then((res) => res.json())
      .then((savedToy) => {
        // Ensure likes exists (tests only care that the toy appears)
        const toyWithLikes =
          savedToy.likes === undefined
            ? { ...savedToy, likes: 0 }
            : savedToy;

        setToys((prevToys) => [...prevToys, toyWithLikes]);
      });
  }

  // PATCH: like a toy
  function handleLikeToy(toy) {
    const updatedLikes = toy.likes + 1;

    fetch(`${API_URL}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((prevToys) =>
          prevToys.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        );
      });
  }

  // DELETE: donate/remove a toy
  function handleDeleteToy(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prevToys) => prevToys.filter((toy) => toy.id !== id));
    });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
