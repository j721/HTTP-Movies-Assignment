import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars:[]
};

const UpdateForm = props => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        // res.data
        setItem(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const changeHandler = ev => {
    ev.persist();
    // let value = ev.target.value;
    // if (ev.target.name === 'metascore') {
    //   value = parseInt(value, 10);
    // }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        // res.data
        props.getMovielist();
        push(`/`);

        // res.data ==> just updated item object
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
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
          value={movie.stars}
        />
        <div className="baseline" />

       

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
