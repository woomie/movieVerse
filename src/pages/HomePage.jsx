import { useEffect, useState } from 'react';
import {fetchMovies} from '../calltoapi/tmdb'
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import './style.css'

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    
    useEffect(()=>{
      const getMovies = async()=>{
        try{
          const data = await fetchMovies();
          //console.log(data)
          setMovies(data)
        }
        catch (error){
          console.log('Error fetching movies:', error)
        }
      }
    getMovies(); 
    }, []);
  return (
    <div className='home'>
      <SearchBar/>
      <h1>Popular Movies</h1>
      <div className='movie-card'>
        {movies.map(movie =>(
        <Link to = {`/movie/${movie.id}`}>
        <MovieCard
          key={movie.id}
          image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          title={movie.title}
          />
         </Link>  
          
        ))}
      </div>  
    </div>
  )
}

export default HomePage
