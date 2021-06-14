import React,{useState,useEffect} from 'react'
import './LoginScreen.css'
import SignupScreen from './SignupScreen'

function LoginScreen() {
    const [signIn, setSignIn] = useState(false)
    return (
        <div className='loginScreen'>
            <div className='loginScreen_background'>
                <img 
                src='https://i1.wp.com/freepngimages.com/wp-content/uploads/2016/10/netflix-logo.png?fit=895%2C559' 
                alt='' 
                className='loginScreen_logo'/>
                <button onClick={()=>setSignIn(true)}
                 className='loginScreen_button'>Sign in</button>
            </div>

            <div className='loginScreen_gradient'></div>

            <div className='loginScreen_body'>
                {
                    signIn 
                    ? (<SignupScreen/>)
                    : <>
                        <h1>Unlimited films, TV programs and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or start your membership</h3>
                        <div className='loginScreen_input'>
                            <form>
                                <input type='email' placeholder='Email Address'/>
                                <button onClick={()=>setSignIn(true)}
                                className='loginScreen_getStart'>GET START</button>
                            </form>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default LoginScreen
