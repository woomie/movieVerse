import { useEffect, useState } from 'react';
import {fetchMovies} from '../calltoapi/tmdb'
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { filterMovies } from '../calltoapi/tmdb';
import NavBar from '../components/NavBar';
import Recommendation from '../components/Recommendation';
import { auth} from '../firebase/config';
import {onAuthStateChanged} from 'firebase/auth';
import '../styles/main.css';



const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false); 
      });
      
      //gets search query or popular movies
      const getMovies= async()=>{
        try{
          //making sure its a valid search query
          if(searchQuery.trim() !== ''){
            setIsSearching(true);
            
            const data = await filterMovies(searchQuery);
            setMovies(data);
            
          }else {
            setIsSearching(false);
            //if no value in search display the popular movies
            const data = await fetchMovies(currentPage);
            //console.log(data)
            setMovies(data);
          }
          
        }
        catch (error){
          console.log('No match:', error)
        }

      }
      getMovies();
      return () => unsubscribe();
    }, [currentPage, searchQuery])

    if (loading) {
      return <div>Loading...</div>; 
    }

  return (
    <div className='home'>
      <NavBar/> 
      <div className='content'>
      <div className='heading'>   
        <SearchBar setSearchQuery={setSearchQuery}/>   
      </div >
      {user && !searchQuery && <Recommendation />}
      <div>
      {isSearching ? (
        <h3 className='subheading'>Search Results</h3>
        ) : (
        <h3 className='subheading'>Popular Movies</h3>
      )}
      </div>
      <div className='movie-card'>
        {movies.map(movie =>(
        <Link to = {`/movie/${movie.id}`}>
        <MovieCard
          key={movie.id}
          image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          title={movie.title}
          date={movie.release_date}
          rating={movie.vote_average}
          />
        </Link>   
        ))}
      </div> 
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
    </div>  
  )
}

export default HomePage
