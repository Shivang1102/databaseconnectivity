import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  const deleteHandler=()=>{
    
  }
  return (
    <>
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
     
    </li>
     <button className={'btn btn-warning'} onClick={deleteHandler}>Delete </button>
     </>
  );
};

export default Movie;
