import React, { useState } from "react";
import axios from "axios";

import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";
import Favourites from "./components/Favourites";
import Recommendations from "./components/Recommendations";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    favourites: [],
    recommendations: [],
    errorMessage: "",
    searched: false,
  });

  const apiurl = "http://www.omdbapi.com/?apikey=dfe6d885";

  // Search handler
  const search = async (e) => {
    if (e.key === "Enter") {
      if (!state.s.trim()) return; // ignore empty searches
      setState((prev) => ({ ...prev, searched: true }));
      try {
        const { data } = await axios(apiurl + "&s=" + state.s);
        if (data.Response === "True") {
          setState((prev) => ({
            ...prev,
            results: data.Search,
            errorMessage: "",
          }));
        } else {
          setState((prev) => ({
            ...prev,
            results: [],
            errorMessage: data.Error || "Movie not found!",
          }));
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          results: [],
          errorMessage: "Network error. Check your API key or connection.",
        }));
      }
    }
  };

  // Handle typing in input
  const handleInput = (e) => {
    setState((prev) => ({ ...prev, s: e.target.value }));
  };

  // Open popup and fetch recommendations
  const openPopup = async (id) => {
    try {
      const { data } = await axios(apiurl + "&i=" + id);
      setState((prev) => ({ ...prev, selected: data }));

      // Simple recommendation: search by first word of title
      const firstWord = data.Title.split(" ")[0];
      const recData = await axios(apiurl + "&s=" + firstWord);
      if (recData.data.Response === "True") {
        setState((prev) => ({
          ...prev,
          recommendations: recData.data.Search.filter((m) => m.imdbID !== id),
        }));
      } else {
        setState((prev) => ({ ...prev, recommendations: [] }));
      }
    } catch {
      setState((prev) => ({ ...prev, recommendations: [] }));
    }
  };

  const closePopup = () => setState((prev) => ({ ...prev, selected: {} }));

  const toggleFavourite = (movie) => {
    setState((prev) => {
      const exists = prev.favourites.find((f) => f.imdbID === movie.imdbID);
      return exists
        ? { ...prev, favourites: prev.favourites.filter((f) => f.imdbID !== movie.imdbID) }
        : { ...prev, favourites: [...prev.favourites, movie] };
    });
  };

  // Reset to start (header click)
  const resetSearch = () => {
    setState((prev) => ({
      ...prev,
      s: "",
      results: [],
      searched: false,
      selected: {},
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <header>
        <h1
          style={{ cursor: "pointer" }}
          onClick={resetSearch}
        >
          Movie Database
        </h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results
          results={state.results}
          openPopup={openPopup}
          errorMessage={state.errorMessage}
          searched={state.searched}
        />
        <Favourites favourites={state.favourites} openPopup={openPopup} />
        <Recommendations
          recommendations={state.recommendations}
          openPopup={openPopup}
        />
        {state.selected.Title && (
          <Popup
            selected={state.selected}
            closePopup={closePopup}
            toggleFavourite={toggleFavourite}
            isFavourite={state.favourites.some((f) => f.imdbID === state.selected.imdbID)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
