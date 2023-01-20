import axios from "axios"
const API_KEY = "23c2625d"

const moviesList = ["BLACK PANTHER: WAKANDA FOREVER", "The Pale Blue Eye",
          "GLASS ONION: A KNIVES OUT MYSTERY", "STRANGE WORLD", "THE MENU"]
export default async function getLatestMovies() {
      const response = []
      for(var i=0; i<moviesList.length; i++){
        response.push((await axios(`https://www.omdbapi.com/?s='${moviesList[i].replace(' ', '+')}'&apikey=${API_KEY}`)).data.Search[0])
      }

    return response
}