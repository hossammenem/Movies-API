import axios from "axios";
import { API_URL } from './config'

export default async function movieExists(title: String, token: String) {
  const user = await axios(`${API_URL}/userInfo`, {
    headers : {
      authorization: `Bearer ${token}`
    }
  })
  return user.data.watchlist.includes(title)
}