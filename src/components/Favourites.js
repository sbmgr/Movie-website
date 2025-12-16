import React from "react";
import Result from "./Result";

function Favourites({ favourites, openPopup }) {
  if (!favourites.length) return null;

  return (
    <section className="favourites">
      <h2>Favourites</h2>
      <div className="results">
        {favourites.map((movie) => (
          <Result key={movie.imdbID} result={movie} openPopup={openPopup} />
        ))}
      </div>
    </section>
  );
}

export default Favourites;
