import React from "react";

function Popup({ selected, closePopup, toggleFavourite, isFavourite }) {
  return (
    <section className="popup">
      <div className="content">
        <h2>
          {selected.Title} <span>({selected.Year})</span>
        </h2>
        <p className="rating">Rating: {selected.imdbRating}</p>
        <div className="plot">
          <img src={selected.Poster} alt={selected.Title} />
          <p>{selected.Plot}</p>
        </div>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {/* Close button */}
          <button className="close" onClick={closePopup}>
            Close
          </button>

          {/* Add/Remove Favourite button */}
          <button
            className="close" // reuse Close button styles
            onClick={() => toggleFavourite(selected)}
          >
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Popup;
