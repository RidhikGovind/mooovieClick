import React, { useState } from "react";

export default function SearchBar() {
  //creating a query state, with its function and setting a default value of ''
  const [query, setQuery] = useState("");
  //note that the movies are stored in an 'array'
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const api_key = "629ce996eae4f5cce613adf9c55a514a";

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&page=1*include_adult="false"&query=${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="searchBar" onSubmit={searchMovies}>
      <h1>| MooovieClick |</h1>

      <form className="form">
        <label className="label" htmlFor="search">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="search"
          placeholder="i.e Wolf of Wall Street"
          value={query}
          //what happens here is when the value is changed, the func setQuery of query state is updated LIVE
          onChange={(e) => setQuery(e.target.value)}
          required={true}
        ></input>
        <button className="searchBtn" type="submit">
          Search
        </button>
      </form>

      <div className="movieList">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div class="movieCard" key={movies.id}>
              <div className="card_img">
                <img
                  src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                  alt="moviePoster"
                />
              </div>

              <div className="card_content">
                {/* <h2 class="language">{movie.original_language}</h2> */}
                <h3 className="card_title">{movie.title}</h3>
                <h4 className="card_details">{movie.overview}</h4>
              
                <div class="circle_content">
                  <div class="circle popularity">
                    <h3>{Math.floor(movie.popularity)}</h3>
                    <h4>Popularity</h4>
                  </div>
                  <div class="circle vote_average">
                  <h3>{movie.vote_average}</h3>
                  <h4>Average Vote</h4>
                  </div>

                </div>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
