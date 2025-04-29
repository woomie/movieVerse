import {useState, useEffect} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { Link, useNavigate } from 'react-router-dom';
import poster from '../assets/tyson-moultrie-BQTHOGNHo08-unsplash.jpg'
import '../styles/signin.css'



const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [error , setError] = useState();
    const navigate = useNavigate();
    //special class for sigin in body

    useEffect(() => {
      document.body.classList.add('auth-body');
  
      return () => {
        document.body.classList.remove('auth-body');
      };
    }, []);

    const handleSignIn = async(e) =>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password)
            alert('signed in successfully')
            setEmail('');
            setPassword('');
            navigate('/');
        }
        catch(error){
            console.log(error);
            //setError(error.message);
        }
        
        
    }
  return (
    <div className='signin-to-db'>
      <div className='right'>
      <div className="home-link">
      <Link to="/">
      <span className="link-to-home" style={{ color: 'black' }}>Home</span>
      </Link>
    </div>
        <form onSubmit={handleSignIn}>
          <h1>Sign In </h1>
            <input
                type='email'
                id='email'
                placeholder='Email'
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input
                type='password'
                id='password'
                placeholder='Password'
                onChange={(e)=> setPassword(e.target.value)}
            />
                <button type='submit'>Submit</button>
                <Link to ={'/signup'}>
                <span className='link-to-signup'>Sign Up</span>
                </Link>
        </form>
        
        
      </div>
      <div className='left'>
        <img
          src={poster}
          alt='poster'
        />
      </div>
      
    </div>
  )
}

export default Signin
