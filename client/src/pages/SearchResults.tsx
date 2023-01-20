import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import searchForMovie from '../api/searchForMovie'
import useDocumentTitle from "../components/useDocumentTitle";


function SearchResults(){
  const [movies, setMovies] = useState<any>([]);
  const { title } = useParams();
  const navigate = useNavigate();
  
  useDocumentTitle(`Searched: ${title}`)

  useEffect(()=> {
    async function fetchMovieResults(){
      const result = await searchForMovie(title!);
      setMovies(result)
      console.log(result)
    }
    fetchMovieResults()
  }, [])
  return (
    <>
  <div className="hero common-hero" style={{background: "black", height : "200px"}}>
	<div className="container">
		<div className="row">
			<div className="col-md-12">
				<div className="hero-ct" style={{height : "350px"}}>
				</div>
			</div>
		</div>
	</div>
</div>

<div className="page-single movie_list" style={{minHeight: "75vh"}}>
	<div className="container">
		<div className="row ipad-width2">
			<div className="col-md-8 col-sm-12 col-xs-12">
          {!movies[0] ?
          <div className="hero-ct" style={{height : "150px", color: "#fff"}}>
            <h1>No Results Found For "{title}"</h1>
          </div>
          :
          <div className="hero-ct" style={{height : "150px", color: "#fff"}}>
          <h1>Searching Results For "{title}"</h1>
        </div>
        }

					{movies.map((movie: any) => (
						<div className="movie-item-style-2">
							<img src={movie.Poster} alt="" />
							<div className="mv-item-infor">
								<h6><a href={`/movie/${movie.Title.replace(' ', '+')}`}>{movie.Title} <span>{movie.Year}</span></a></h6>
							</div>
						</div>
          ))}
			</div>
		</div>
	</div>
</div>
</>
  )
}

export default SearchResults;