import React from 'react';
import Result from './Result';

function Results({ results = [], openPopup, errorMessage = "", searched = false }) {
  return (
    <section className="results">
      {results.length > 0 ? (
        results.map(result => (
          <Result key={result.imdbID} result={result} openPopup={openPopup} />
        ))
      ) : (
        searched && errorMessage && (
          <p style={{ color: "white", padding: "15px" }}>{errorMessage}</p>
        )
      )}
    </section>
  );
}

export default Results;
