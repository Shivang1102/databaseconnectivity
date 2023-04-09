import React ,{useCallback, useEffect, useState}from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

   const [movies, setMovies]=useState([]);

   const [isLoading , setIsLoading]= useState(false);

   const [error , setError]= useState(null);
   


   const  fetchMoviesHandler=useCallback( async()=>{
        setIsLoading(true)
        setError(null);
       try{
        const response =  await fetch('https://swapi.dev/api/films');
        if(!response.ok){
          throw new Error('Something Went wrong!');
         
       }
       
        const data = await response.json()
       
     
              const transformeddata = data.results.map(movieData=>{
                 return {
                   id:movieData.episode_id,
                   title:movieData.title,
                   openingText:movieData.opening_crawl,
                   releaseDate:movieData.release_date,
                 }
              })
                 setMovies(transformeddata);
                       
            }catch(error){
                 setError(error.message)
            }
            setIsLoading(false);
        },[]);
        useEffect(()=>{
          fetchMoviesHandler();
  },[fetchMoviesHandler])    
      
        let contetnt =<p>Movie not found</p>
     if(movies.length>0){
      contetnt=<MoviesList movies={movies} />
     }
      if(error){
        contetnt=<p>{error}</p>
      }
 if(isLoading){
  contetnt=<p>Loading...</p>
 }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
     {contetnt}
      </section>
    </React.Fragment>
  );
}

export default App;
