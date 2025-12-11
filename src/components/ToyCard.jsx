// src/components/ToyCard.jsx
import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  function handleLikeClick() {
    // pass the full toy so App can PATCH with current likes
    onLike(toy);
  }

  function handleDonateClick() {
    onDelete(toy.id);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDonateClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
