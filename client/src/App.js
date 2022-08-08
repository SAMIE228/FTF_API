import React, { useEffect, useState } from "react"; 
import './App.css';
import Axios from 'axios'

function App() {
const [movieName, setMovieName] = useState('');
const [review, setReview] = useState('');
const [movieReviewList, setMovieList] = useState([]);

const [newReview, setNewReview] = useState("")

useEffect(()=>{
  Axios.get("https://ftf-app-service.herokuapp.com/api/get").then((response) => {
    setMovieList(response.data)
  });
},[]);

const submitReview = () => {
Axios.post("https://ftf-app-service.herokuapp.com/api/insert", {
  movieName: movieName, 
  movieReview: review,
});
  setMovieList([
    ...movieReviewList,
    {movieName: movieName, movieReview: review},
  ]);
};

const deleteReview = (movie) => {
  Axios.delete(`https://ftf-app-service.herokuapp.com/api/delete/${movie}`);
};

const updateReview = (movie) => {
  Axios.put("https://ftf-app-service.herokuapp.com/api/update", {
    movieName: movie, 
    movieReview: newReview,
  });
  setNewReview("")
};

  return (
    <div className="App">
      <h1>FEDERATION TOGOLAISE DE FOOTBALL</h1>
      <div className="form">
        <label>Nom du joueur</label>
        <input 
        type="text" 
        name="movieName" 
        onChange={(e) => {
          setMovieName(e.target.value);
        }} 
        />
        <label>Statistique</label>
        <input 
        type="text" 
        name="review"
        onChange={(e) => {
          setReview(e.target.value);
        }} 
        />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val)=> {
            return (
              <div className="card">
            <h1>{val.movieName}</h1>
             <p>{val.movieReview}</p>

             <button
              onClick={() => {
                deleteReview(val.movieName)}}>
                  Delete
                  </button>
             <input type="text" id="updateInput" onChange={(e)=>{
               setNewReview(e.target.value)
             }}/>
             <button onClick={(e)=> {updateReview(val.movieName)}}>Update</button>
             </div>
            ); 
          })}
      </div>
    </div>
  );
}

export default App;
