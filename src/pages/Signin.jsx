import {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { Link, useNavigate } from 'react-router-dom';
import poster from '../assets/tyson-moultrie-BQTHOGNHo08-unsplash.jpg'



const Signin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    //const [error , setError] = useState();
    const navigate = useNavigate();

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
    <div className='signin'>
      <div className='right'>
      <Link to ={'/'}>
        <span className='link-to-home'>Home</span>
      </Link>
        <form onSubmit={handleSignIn}>
          <h1>Sign In </h1>
            <input
                type='text'
                id='email'
                placeholder='email'
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input
                type='password'
                id='password'
                placeholder='password'
                onChange={(e)=> setPassword(e.target.value)}
            />
                <button>Submit</button>
                <Link to ={'/signup'}>
                <span className='link-to-signup'>Sign Up</span>
                </Link>
        </form>
        
        
      </div>
      <div className='left'>
        <img
          src={poster}
        />
      </div>
      
    </div>
  )
}

export default Signin
