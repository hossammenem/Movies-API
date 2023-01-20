import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getFullMovie from "../api/getFullMovie";
import movieExists from "../api/movieExists";
import { useSelector } from "react-redux";
import addToWatchlist from "../api/addToWatchlist";
import deleteFromWatchlist from "../api/deleteFromWatchlist";
import useDocumentTitle from "../components/useDocumentTitle";


function SingleMovie() {
  const [movie, setMovie] = useState<any>({});
  const [exists, setExists] = useState(false);
  const { title } = useParams();
  const { user } = useSelector(
    (state: any) => state.auth
)
  useDocumentTitle(title)
  
  useEffect(()=> {
    async function getMovie(){
      const response = await getFullMovie(title!)
      setMovie(response)
    }
    getMovie()
  }, [])


  useEffect(()=> {
    async function doesExist(){
      const response = await movieExists(movie.Title, user.token)
      setExists(response)
    }
    doesExist()
  }, [movie.Title])

  function deleteFromWatchlistHandler(){
    deleteFromWatchlist(movie.Title, user.token)
    setExists(false)
  }
  function addToWatchlistHandler(){
    addToWatchlist(movie.Title, user.token)
    setExists(true)
  }

  console.log(movie)
  return (
    <>
    <div className="hero mv-single-hero">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          </div>
        </div>
      </div>
    </div>

<div className="page-single movie-single movie_single">
  <div className="container">
    <div className="row ipad-width2">
      <div className="col-md-4 col-sm-12 col-xs-12">
        <div className="movie-img sticky-sb">
          <img src={movie.Poster} alt="" />
        </div>
      </div>
      <div className="col-md-8 col-sm-12 col-xs-12">
        <div className="movie-single-ct main-content">
          <h1 className="bd-hd">{movie.Title}<span> {movie.Year}</span></h1>
            {!user ? ( 
              <div className="social-btn">
                <a href="/login" className="parent-btn">*Log in now so you can add movies to your watchlist*</a>	
              </div> ) : 
              ( exists ?
              <div className="social-btn">
                <a onClick={deleteFromWatchlistHandler} className="parent-btn"><i className="ion-close"></i> Delete From Watchlist</a>	
              </div> :
              <div className="social-btn">
                <a onClick={addToWatchlistHandler} className="parent-btn"><i className="ion-heart"></i> Add to Watchlist</a>	
              </div>
              )
            }


            <div className="movie-rate">
              <div className="rate">
                <i className="ion-android-star"></i>
                <p><span>{movie.imdbRating}</span><br /></p>
              </div>
            </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12" style={{marginTop: "-50px"}}>
          <p>{movie.Plot}</p>
        </div>
    </div>
    
  </div>
<div className="movie-tabs">
  <div className="tab-content">
    <div id="overview" className="tab active">
      <div className="row">

          <div className="title-hd-sm">
            <h4>cast</h4>
          </div>
          <div className="mvcast-item">	
            <div className="cast-it">
              <div className="cast-left cast">
                <span>Actors:</span> {movie.Actors}
              </div>
              <div className="cast-left cast">
              <span>Directors:</span> {movie.Director}
              </div>
              <div className="cast-left cast">
                <span>Writers:</span> {movie.Writer}
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
  </>
  )
}

export default SingleMovie;