import React from "react";
import Result from "./Result";

function Recommendations({ recommendations, openPopup }) {
  if (!recommendations.length) return null;

  return (
    <section className="recommendations">
      <h2>Recommended Movies</h2>
      <div className="results">
        {recommendations.map((movie) => (
          <Result key={movie.imdbID} result={movie} openPopup={openPopup} />
        ))}
      </div>
    </section>
  );
}

export default Recommendations;
