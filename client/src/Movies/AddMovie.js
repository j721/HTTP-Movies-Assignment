import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars:[]
};

const AddMovie = props => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);

  
  const changeHandler = e => {
    e.persist();

    let value = e.target.name===`stars` ? e.target.value.split(','): e.target.value;
    
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then(res => {
        props.getMovieList();
        push(`/`);

      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars.join(',')}
        />
        <div className="baseline" />

       

        <button className="md-button form-button">Add</button>
      </form>
    </div>
  );
};

export default AddMovie;
