import axios from "axios"
import { API_KEY } from "./config"

export default async function searchForMovie(title: String) {
    const response = await axios(`https://www.omdbapi.com/?s='${title.replace(' ', '+')}'&apikey=${API_KEY}`)
    return response.data.Search
}
