import {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error , setError] = useState();
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
            setError(error.message);
        }
        
        
    }
  return (
    <div>
      <div></div>
      <div>
        <h2>Sign In </h2>
        <form onSubmit={handleSignIn}>
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
            
            
        </form>
        <p>New User?</p>
        <Link to ={'/signup'}>
        <button>Sign Up</button>
        </Link>
        
      </div>
    </div>
  )
}

export default Signin
