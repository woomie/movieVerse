import { useState , useEffect} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../firebase/config';
import poster from '../assets/tyson-moultrie-BQTHOGNHo08-unsplash.jpg'
import '../styles/signin.css'


const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    //const [error, setError] = useState();
    const navigate = useNavigate();

     //special class for sigin in body
     useEffect(() => {
        document.body.classList.add('auth-body');
    
        return () => {
          document.body.classList.remove('auth-body');
        };
      }, []);


    const handleSignUp= async (e)=>{
        e.preventDefault();
        try{
            const credentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = credentials.user;
            await setDoc(doc(db, 'users', user.uid),{
                email:user.email,
                displayName: name,
                WatchList:[]
            })

            
            
            await updateProfile(user, {
                displayName: name, 
            });
    
            alert(`${name} successfully created`)
            setEmail('')
            setPassword('')
            navigate('/');
        }
        catch(error){
            console.log(error)
            //setError(error.message)
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
        <form onSubmit={handleSignUp}>
        <h2>Sign Up </h2>
            <input
                type='text'
                id = 'name'
                placeholder='Please Enter your name'
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                id = 'email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                id = 'password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Submit</button>
            <Link to ={'/signin'}>
            <span className='link-to-signup'>Sign In</span>
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

export default SignUp
