import {useState, useEffect} from 'react'
import logo from '../assets/Logo.png'
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';




const NavBar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return () => unsubscribe();
}, []);

  return (
    <div className='nav-bar'>
      <img 
        src={logo}
        alt= 'website Logo'
      />
  
      {user ?
      (
        <div>
          <span>Hello, {user.displayName}</span>
          <button onClick={()=> signOut(auth)}>Sign Out</button>
        </div>
      ):(
        <Link to ={'/signin'}>
        <button>Sign In</button>
      </Link>
      )
      
      }
      <Link to ={'/watchlist'}>
      <button>WatchList</button>
    </Link>

      
      
    </div>
  )
}

export default NavBar
