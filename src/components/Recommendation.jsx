import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import axios from 'axios'; // for API calls
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Recommendation = () => {
  const [list, setList] = useState([]);  // 👉 ADD THIS to store user's watchlist
  const [recommendations, setRecommendations] = useState([]); // to store recommended movies

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchWatchlist(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchWatchlist = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const { watchlist } = userSnap.data();
        setList(watchlist || []);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  useEffect(() => {
    if (list.length > 0) {
      recommendMovies(list);
    }
  }, [list]);
  const getTopGenres = (watchlist) => {
    const genreCount = {};

    watchlist.forEach((movie) => {
      movie.genres?.forEach((genre) => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });

    // Sort and pick top 2 genres
    const topGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map((entry) => entry[0]);

    return topGenres;
  };


  const recommendMovies = async (watchlist) => {
    const topGenres = getTopGenres(watchlist);
    console.log('Top genres:', topGenres);
  
    const recommended = [];
    const watchlistIds = new Set(watchlist.map((movie) => movie.id));
  
    for (const genreName of topGenres) {
      const genreId = getGenreId(genreName);
  
      if (genreId) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              with_genres: genreId,
            },
          }
        );
  
        const genreResults = response.data.results || [];
  
        for (const movie of genreResults) {
          if (
            !watchlistIds.has(movie.id) &&
            !recommended.some((m) => m.id === movie.id)
          ) {
            recommended.push(movie);
            if (recommended.length === 4) break;
          }
        }
      }
  
      if (recommended.length === 4) break;
    }
  
    setRecommendations(recommended);
  };
  // Dummy genre mapping (you need real TMDB genre IDs here)
  const getGenreId = (genreName) => {
    const genreMap = {
        "Action": 28,
        "Adventure": 12,
        "Animation": 16,
        "Comedy": 35,
        "Crime": 80,
        "Documentary": 99,
        "Drama": 18,
        "Family": 10751,
        "Fantasy": 14,
        "History": 36,
        "Horror": 27,
        "Music": 10402,
        "Mystery": 9648,
        "Romance": 10749,
        "Science Fiction": 878,
        "TV Movie": 10770,
        "Thriller": 53,
        "War": 10752,
        "Western": 37
      };
      
      return genreMap[genreName];
    };
  
      
return (
  <div >
    <h3 className='subheading'>Recommended For you</h3>
    <div className='movie-card'>
  {recommendations.map(movie => (
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
</div>
)
}
export default Recommendation

