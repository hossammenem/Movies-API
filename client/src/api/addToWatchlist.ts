import axios from "axios";
import { API_URL } from './config'

export default async function addToWatchlist(movie: String, token: String){
  const response = await axios(`${API_URL}/add-to-watchlist`, {
    method: "POST",
    data: JSON.stringify({
      movie,
    }),
    headers : {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  return response
}