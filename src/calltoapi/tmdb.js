import axios from 'axios';

const API_Key =process.env.REACT_APP_TMDB_API_KEY;
const BaseUrl = 'https://api.themoviedb.org/3';
export const fetchMovies =async () => {
    const response = await axios.get(`${BaseUrl}/movie/popular`, {
        params: {
          api_key: API_Key,
          page: 1
        }
      });
  //console.log(response.data);    
  return response.data.results
}

export const fetchMoviesDetails = async (movieId) =>{
  const response = await axios.get(`${BaseUrl}/movie/${movieId}`,{
    params:{
      api_key: API_Key,
      append_to_response: 'credits,videos,reviews'
    }
  });
  //console.log(response.data);  
  return response.data
}


