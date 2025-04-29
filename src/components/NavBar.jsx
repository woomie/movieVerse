import {useState, useEffect} from 'react'
import logo from '../assets/MovieVersewhite.png';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { FaSignInAlt, FaSignOutAlt, FaHome, FaBookmark, FaGithub } from 'react-icons/fa' ;




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
      alt='website Logo'
      className="logo"
    />

    {user && (
      <span className="user-name">
        Hello, {user.displayName}
      </span>
    )}

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

    <Link to='https://github.com/woomie/movieVerse'>
      <span className="nav-link">
        <FaGithub style={{ marginRight: '8px' }}/> Github
      </span>
    </Link>

    {user ? (
      <button onClick={() => signOut(auth)} className="nav-link logout-btn">
        <FaSignOutAlt style={{ marginRight: '8px' }}/> Sign Out
      </button>
    ) : (
      <Link to='/signin'>
        <span className="nav-link">
          <FaSignInAlt style={{ marginRight: '8px' }}/> Sign In
        </span>
      </Link>
    )}
  </div>
)
}
export default NavBar
