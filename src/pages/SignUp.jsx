import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../firebase/config';


const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();


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
            setError(error.message)
        }
    }
  return (
    <div>
      <div></div>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
            <input
                type='text'
                id = 'name'
                placeholder='Please Enter a name'
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                id = 'email'
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                id = 'password'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Submit</button>
        </form>
        <p>Already have an account?</p>
        <Link to ={'/signin'}>
        <button>Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
