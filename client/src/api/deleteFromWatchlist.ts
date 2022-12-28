import axios from "axios";
import { API_URL } from './config'

export default async function deleteFromWatchlist(movie: String, token: String){
  const response = await axios(`${API_URL}/delete-from-watchlist`, {
    method: "POST",
    data: JSON.stringify({
      movie,
    }),
    headers : {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  })
  return response
}