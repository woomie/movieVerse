import axios from 'axios';
import {db} from '../firebase/config';
import { doc, setDoc} from 'firebase/firestore';



const API_Key =process.env.REACT_APP_TMDB_API_KEY;
const BaseUrl = 'https://api.themoviedb.org/3';

//function to fetch popular movies
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

//function to fetch movie details using its Id
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

//function that takes the query from search box and checks database for matching movie titles
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

export const fetchGenres = async ()=>{
  try{
  const response = await axios.get(`${BaseUrl}/genre/movie/list`,
    {
      params:{
        api_key: API_Key
      } 
    });
   
  const genreMap = {}
  response.data.genres.forEach(genre => {
    genreMap[genre.id]=genre.name
  });
  console.log('genre map has been created', genreMap) 
  
  const genreRef = doc(db, 'metadata', 'genres');
  await setDoc(genreRef,{
    genreMap,
    
  });
  //console.log('saved to db')
  return genreMap;
 
}
catch(error){
  console.log(error)
}

};
//fetchGenres();

