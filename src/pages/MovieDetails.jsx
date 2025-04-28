import React, {useState, useEffect} from 'react'
import { fetchMoviesDetails } from '../calltoapi/tmdb'
import { useParams } from 'react-router-dom';
import { doc, updateDoc, arrayUnion ,collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import './style.css'
import ReviewsList from '../components/ReviewsList';
import {FaBookmark } from 'react-icons/fa';


const MovieDetails = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [review, setReview] = useState('');

  useEffect(()=>{
    const getMovieDetails = async() =>{
      try{
        setLoading(true);
        const data = await fetchMoviesDetails(id);
        //console.log(data);
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
  
  const handleWatchList = async()=>{
    if(!user){
      alert('Sign in to add movies to your watchlist');
      return;
    }
    const userRef = doc(db, 'users', user.uid);

    await updateDoc(userRef, {
      watchlist: arrayUnion({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        date:movie.release_date,
        rating:movie.vote_average

      })
    });
  
    alert('Movie added to watchlist!');
  };
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in to leave a review');
      return;
    }

    try {
      await addDoc(collection(db, 'reviews'), {
        movieId: movie.id,
        movieTitle: movie.title,
        userId: user.uid,
        userName: user.displayName,
        reviewText: review,
        createdAt: serverTimestamp()
      });
      alert('Review submitted!');
      setReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };



  return (
    <div>
      
      <div className='movie-detail-hero' style={
        {backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }
    }>
      <div className='bottom-left-div'>
      <h1 >{movie.title}</h1>
      <p >{movie.release_date}</p>
      </div>
    </div>
      <div className='movie-details-body'>
        <div className='movie-details-poster'>
        <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        />
        <button onClick={handleWatchList}>
            <FaBookmark style={{ marginRight: '8px' }}/>Add To WatchList
            </button>
        </div>
        
        <div className='movie-details-overview'>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          
          <form onSubmit={handleReviewSubmit}>
      <textarea 
        placeholder="Write your review here..." 
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
    <ReviewsList movieId={movie.id}/>
        </div>
        <div className='movie-details-cast'>
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
