import { useEffect, useState } from 'react';
import {fetchMovies} from '../calltoapi/tmdb'
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { filterMovies } from '../calltoapi/tmdb';
import NavBar from '../components/NavBar';
import './style.css'



const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    

    useEffect(()=>{
      const getMovies= async()=>{
        try{
          if(searchQuery.trim() !== ''){
            setIsSearching(true);
            const data = await filterMovies(searchQuery);
            setMovies(data);
          }else {
            setIsSearching(false);
            const data = await fetchMovies(currentPage);
            setMovies(data);
          }
          
        }
        catch (error){
          console.log('No match:', error)
        }

      }
      getMovies();
    }, [currentPage, searchQuery])

  return (
    <div className='home'>
      <NavBar/>
      <SearchBar setSearchQuery={setSearchQuery}/>
      {isSearching ? (
        <h2>Search Results</h2>
        ) : (
        <h2>Popular Movies</h2>
      )}
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
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>  
  )
}

export default HomePage
