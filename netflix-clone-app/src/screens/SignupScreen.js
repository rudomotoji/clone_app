import React, { useRef } from 'react'
import { auth } from '../firebase';
import './SignupScreen.css'

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const register=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser)=>{

        })
        .catch((err)=>alert(err));
    }
    const signin=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser)=>{

        })
        .catch((err)=>alert(err));
    }
    return (
        <div className='signupScreen'>
            <form>
                <h1>SIGN IN</h1>
                <input ref={emailRef} type='email' placeholder='Email Address'/>
                <input ref={passwordRef} type='password' placeholder='password'/>
                <button type='submit' onClick={signin}>Sign in</button>

                <h4>
                    <span className='signupScreen_gray'>New to Netflix?</span> 
                    <span className='signupScreen_link' onClick={register}>Signup now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SignupScreen
