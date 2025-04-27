import axios from 'axios';

const API_Key =process.env.REACT_APP_TMDB_API_KEY;
const BaseUrl = 'https://api.themoviedb.org/3';

export const fetchMovies =async (currentPage) => {

    const response = await axios.get(`${BaseUrl}/movie/popular`, {
        params: {
          api_key: API_Key,
          page: currentPage
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

export const filterMovies = async (query, page= 1) => {
  const response = await axios.get(`${BaseUrl}/search/movie`,{
    params:{
      api_key: API_Key,
      query: query,
      page: page

    }
  });
  return response.data.results
}
