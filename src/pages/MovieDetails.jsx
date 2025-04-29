import React, {useState, useEffect} from 'react'
import { fetchMoviesDetails } from '../calltoapi/tmdb'
import { useParams } from 'react-router-dom';
import { doc, updateDoc, arrayUnion ,collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReviewsList from '../components/ReviewsList';
import {FaBookmark, FaStar, FaHome, FaSignInAlt } from 'react-icons/fa';
import { Link} from 'react-router-dom';



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
        //pass the id from params 
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
      //check if user is logged in
      alert('Sign in to add movies to your watchlist');
      return;
    }
    const userRef = doc(db, 'users', user.uid);
    //stores the data in users collection
    await updateDoc(userRef, {
      watchlist: arrayUnion({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        date:movie.release_date,
        rating:movie.vote_average,
        genres: movie.genres ? movie.genres.map(genre => genre.name):[]

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

    //save user review to reviews collection
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
    <div className='movie-details-page'>
      <div className='movie-detail-hero' style={ 
        {backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }
    }>
      <div className="movie-details-navbar">
      <Link to='/'>
            <span className="nav-link">
              <FaHome style={{ marginRight: '8px' }}/> Home
            </span>
          </Link>
        <Link to='/watchlist'>
      <span className="nav-link">
        <FaBookmark style={{ marginRight: '8px' }}/> WatchList
      </span>
    </Link>
    <Link to='/signin'>
      <span className="nav-link">
        <FaSignInAlt style={{ marginRight: '8px' }}/> SignIn
      </span>
    </Link>
      </div>
      <div className='glass-card'>
        <div className='glass-card-content'>
          <h2>{movie.title}</h2>
          <div className='glass-card-cast'>
            <span style={{color:'white', fontSize:'smaller'}}>Cast</span>
            {movie.credits.cast.slice(0, 3).map((actor, index) => (
              <p>{actor.name}</p>  
            ))} 
          </div>
          <div className='glass-card-stats'>
          <p>IMDB <FaStar style={{ color: 'gold', marginRight: '5px' }}/> {movie.vote_average ? parseFloat(movie.vote_average.toFixed(1)) : "N/A"}/10</p>  
          <p>({movie.vote_count})</p>
          <p>&#x2022;</p>
          <p> { movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</p>

          </div>
          <hr></hr>

          <p>{movie.overview}</p>

          <p style ={{ color: '#D84E27' , fontWeight:'bold'}}>
            <span style ={{ color: 'white', marginRight:'10px' }} >Duration</span>
            {movie.runtime 
            ? `${Math.floor(movie.runtime / 60)}hr ${movie.runtime % 60}mins` 
            : 'N/A'}
          </p>
          <button onClick={handleWatchList}>
            <FaBookmark style={{ marginRight: '8px' }}/>Add To WatchList
          </button>

        </div>
      </div>
    </div>

    <div className='movie-details-body'>
    <h3>Cast</h3>
      <div className='movie-details-cast'>
      {movie.credits.cast.slice(0, 10).map((actor, index) => (
      <div key={index} className="cast-card">
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : '/fallback.png'
        }
        alt={actor.name}
      />
      <div className="cast-info">
        <p className="actor-name">{actor.name}</p>
        
      </div>
    </div>
    
  ))}
  </div>




      <div>
        
          <div>
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


  
        </div>      
      </div>
    </div>
    
  )
}

export default MovieDetails
