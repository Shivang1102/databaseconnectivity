import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";
function App() {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://react-tutorial-ea45d-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something Went wrong!");
      }

      const data = await response.json();

      const loadedMovies=[];

      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  

   async function addMovieHandler(movie){
     const response = await fetch('https://react-tutorial-ea45d-default-rtdb.firebaseio.com/movies.json', {
        method: 'POST',
        body:JSON.stringify(movie),
        headers:{
          'Content-Type': 'application/json'
        }
       });

       const data= await response.json();
        console.log(data);
   }


  let contetnt = <p>Movie not found</p>;
  if (movies.length > 0) {
    contetnt = <MoviesList movies={movies} />;
  }
  if (error) {
    contetnt = <p>{error}</p>;
  }
  if (isLoading) {
    contetnt = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{contetnt}</section>
    </React.Fragment>
  );
}

export default App;
