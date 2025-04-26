import React, {useState, useEffect} from 'react'
import { fetchMoviesDetails } from '../calltoapi/tmdb'
import { useParams } from 'react-router-dom';
import './style.css'

const MovieDetails = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const getMovieDetails = async() =>{
      try{
        setLoading(true);
        const data = await fetchMoviesDetails(id);
        console.log(data);
        setMovie(data);
      }
      catch(error){
        console.log('No details to show:', error)
      }
      finally {
        setLoading(false);
      }
    }
   getMovieDetails(); 
  }, [id]);
        
  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;          

  return (
    <div>
      <div className='main' style={
        {backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }
    }>
      <h1>{movie.title}</h1>
      <p>{movie.release_date}</p>
        
    </div>
      <div>
        <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        />
        
        <div>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Ratings {movie.vote_average}</h3>
          <p> Number of votes: {movie.vote_count}</p>
        </div>
        <div>
  <h3>Cast</h3>
  {movie.credits.cast.slice(0, 13).map((actor, index) => (
    <div key={index} className="cast-card">
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : '/fallback.png'
        }
        alt={actor.name}
      />
      <p>{actor.name}</p>
      <p>{actor.character}</p>
    </div>
  ))}
</div>
          
      </div>
    </div>
  )
}

export default MovieDetails
