import axios from "axios"
const API_KEY = "23c2625d"

export default async function searchForMovie(title: String) {
    const response = await axios(`https://www.omdbapi.com/?s='${title.replace(' ', '+')}'&apikey=${API_KEY}`)
    return response.data.Search
}