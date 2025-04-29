import {useState, useEffect} from 'react';
import {arrayRemove, doc, getDoc, updateDoc} from 'firebase/firestore';
import {db, auth} from '../firebase/config';
import {onAuthStateChanged} from 'firebase/auth';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/NavBar';

const WatchList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchWatchlist(user.uid);
            } else {
                setList([]);
                setLoading(false);
            }
        });

        
        return () => unsubscribe();
    }, []);

    const fetchWatchlist = async (userId) => {
        try {
            setLoading(true);
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const {watchlist} = userSnap.data();
                setList(watchlist || []);
            }
        } catch (error) {
            console.error("Error fetching watchlist:", error);
        } finally {
            setLoading(false);
        }
    };

    

    const handleRemove = async (movie) => {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);

        try {
            await updateDoc(userRef, {
                watchlist: arrayRemove(movie)
            });
            setList((prev) => prev.filter((item) => item.id !== movie.id));
        } catch (error) {
            console.error("Error removing movie:", error);
        }
    };

    return (
        <div className='watchlist-layout'>
            <NavBar/>
            <div className='watchlist-content'>
                {loading ? (
                    <p>Loading your watchlist...</p>
                ) : list.length > 0 ? (
                    list.map(movie => (
                        <div key={movie.id} className='movie-card'>
                            <MovieCard 
                                image={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                                title={movie.title}
                                date={movie.date}
                                rating={movie.rating}
                            />
                           <button onClick={() => handleRemove(movie) }>Remove</button> 
                        </div>
                    ))
                ) : (
                    <p>Your Watchlist is empty</p>
                )}
            </div>
        </div>
    );
};

export default WatchList;