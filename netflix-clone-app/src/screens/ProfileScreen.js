import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Nav from '../Nav'
import './ProfileScreen.css'

function ProfileScreen() {
    const user = useSelector(selectUser);

    return (
        <div className='profileScreen'>
            <Nav/>
            <div className='profileScreen_body'>
                <h1>Edit profile</h1>
                <div className='profileScreen_info'>
                    <img
                        className='profileScreen_avatar'
                        src='https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png'
                        alt=''
                    />
                    <div className='profileScreen_details'>
                        <h2>{user.email}</h2>
                        <div className='profileScreen_plans'>
                            <button
                                onClick={()=>auth.signOut()}
                                className='profileScreen_signout'>Sign out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
