import { useEffect, useState } from "react";
import getLatestMovies from "../api/getLatestMovies";
import useDocumentTitle from "../components/useDocumentTitle";
import sliderFunction from "../components/slider";

function Home(){
    useDocumentTitle("Home")
    const [movies, setMovies] = useState<any>([])

    useEffect(()=>{
      async function latestMovies(){
        const response = await getLatestMovies()
        setMovies(response)
      } 
      latestMovies()
    }, [])

    useEffect(()=> sliderFunction, [movies])
    return ( 
    <>
<div className="slider" style={{backgroundColor: "black", height: "calc(100vh - 65px)"}}>
  <div className="carousel-container">
    <div className="wrapper">
    {movies.map((movie:any, index: any) => ( 
      <div className="carousel-slide" style={{backgroundImage: `url(${movie.Poster})`, 
      transform: `translateX(${index * 100}%)`}} key={index}>
        <div className="title">
          <a href={`/movie/${movie.Title.replace(' ', '+')}`}>{movie.Title}</a>
        </div>
      </div>
    ))}
    </div>
    <button className="carousel-btn  btn-next"></button>
    <button className="carousel-btn  btn-prev"></button>
  </div>
</div>

    </>
);
}

export default Home;