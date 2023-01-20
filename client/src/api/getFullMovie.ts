import axios from "axios"
import { API_KEY } from "./config"

export default async function getFullMovie(title: String) {
    const response = await axios(`https://www.omdbapi.com/?t='${title.replace(' ', '+')}'&apikey=${API_KEY}`)
    return response.data
}
