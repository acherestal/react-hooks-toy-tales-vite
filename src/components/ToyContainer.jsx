// src/components/ToyContainer.jsx
import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLikeToy, onDeleteToy }) {
  return (
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLike={onLikeToy}
          onDelete={onDeleteToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
