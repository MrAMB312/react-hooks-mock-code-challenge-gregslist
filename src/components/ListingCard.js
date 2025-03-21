import React, { useState } from "react";

function ListingCard({ listing, onDeleteListing }) {
  const { id, description, image, location } = listing;
  const [isFavorited, setIsFavorited] = useState(false);

  function handleFavoriteToggle() {
    setIsFavorited((prev) => !prev);
    console.log(isFavorited ? "unfavorited listing:" : "favorited listing", listing);
  }

  function handleDeleteListing() {
    fetch(`http://localhost:6001/listings/${listing.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteListing(listing));
  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image} alt={description} />
      </div>
      <div className="details">
        {isFavorited ? (
          <button className="emoji-button favorite active" onClick={handleFavoriteToggle}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={handleFavoriteToggle}>☆</button>
        )}
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={handleDeleteListing}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;