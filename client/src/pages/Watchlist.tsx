import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import getUserWatchlist from "../api/getUserWatchlist"
import useDocumentTitle from "../components/useDocumentTitle";

function Watchlist(){
  useDocumentTitle("watchlist")
  const [movies, setWatchlist] = useState<any>([]);
  const { user } = useSelector( (state: any) => state.auth )

  useEffect(()=>{
    async function fecthMovies(){
      const wathclist = await getUserWatchlist(user.token)
      setWatchlist(wathclist)
    }
    fecthMovies()
  }, [user])


  return (
  <>
  <div className="slider movie-items" style={{background: "black", height: "calc(100vh - 65px)"}}>
    <div className="container">
          {movies.map((movie: any, index: any) => (
            <div className="list" key={index}>
              <a className="items" href={`/movie/${movie}`}>{movie}</a>
              {/* <a className='right parent-btn' href="{% url 'delete-from-watchlist' movie.id %}"><i className="ion-close"></i></a> */}
            </div>
          ))}
    </div>
  </div>
  </>
)
}

export default Watchlist