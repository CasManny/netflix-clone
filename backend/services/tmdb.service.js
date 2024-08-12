
  
//   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
import axios from 'axios'

export const fetchTMDBMovies = async (url) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.TMDB_ACCESS_TOKEN
        }
    };
    
    const response = await axios(url, options)
    if (response.status !== 200) {
        throw new Error("Failed to fetch data from TMDB")
    }
    return response.data
}