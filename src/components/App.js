import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((r) => r.json())
      .then((listings) => setListings(listings))
  }, []);

  function handleDeleteListing(deletedListing) {
    const updatedListings = listings.filter((listing) => listing.id !== deletedListing.id);
    setListings(updatedListings);
  }

  const displayedListings = listings.filter((listing) => 
    listing.description.toLowerCase().includes(searchTerm)
  );

  function handleSearch(term) {
    setSearchTerm(term.toLowerCase());
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <ListingsContainer 
        listings={displayedListings}
        onDeleteListing={handleDeleteListing} />
    </div>
  );
}

export default App;
