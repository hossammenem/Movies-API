import axios from "axios"
const API_KEY = "23c2625d"

export default async function getFullMovie(title: String) {
    const response = await axios(`https://www.omdbapi.com/?t='${title.replace(' ', '+')}'&apikey=${API_KEY}`)
    return response.data
}