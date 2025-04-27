import {useState, useEffect} from 'react';
import {arrayRemove, doc, getDoc, updateDoc} from 'firebase/firestore';
import {db, auth} from '../firebase/config'
import MovieCard from '../components/MovieCard'

const WatchList = () => {
    const [list, setList]= useState([]);

    useEffect(()=>{
        const getWatchList = async ()=>{
            const user = auth.currentUser;
            if(!user) {return};

            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if(userSnap.exists()){
                const {watchlist} = userSnap.data();
                setList(watchlist || []);
            }
        };
        getWatchList();
    }, []);

    const handleRemove = async(movie)=>{
        const user = auth.currentUser;
        if(!user) return;

        const userRef = doc(db, 'users', user.uid);

        await updateDoc (userRef, {
            watchlist: arrayRemove(movie)
        });
        setList((prev) => prev.filter((item) => item.id !== movie.id));
    }

  return (
    <div>
      {list.length > 0 ? (
        list.map(movie =>(
            <div>
            <MovieCard
                key={movie.id}
                image={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                title={movie.title}
            />
            <button onClick={() => handleRemove(movie)}>Remove</button>
            </div>
          ))
        ):(
            <p>Your Watchlist is empty</p>
        )
      }  
      
    </div>
  )
}

export default WatchList
