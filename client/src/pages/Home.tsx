import { useEffect, useState } from "react";
import getLatestMovies from "../api/getLatestMovies";

function Home(){
    const [movies, setMovies] = useState<any>([])

    useEffect(()=>{
      async function latestMovies(){
        const response = await getLatestMovies()
        setMovies(response)
      } 
      latestMovies()
    }, [])
    return ( 
    <>
<div className="slider movie-items" style={{backgroundColor: "black", height: "93.1vh"}}>
	<div className='movies-container responsive'>
    {movies.map((movie:any, index: any) => ( 
      <div className="movie" style={{backgroundImage: `url(${movie.Poster})`}} key={index}>
        <div className="title">
          {movie.Title}
        </div>
      </div>
    ))}
    

  </div>
</div>

    </>
);
}

export default Home;