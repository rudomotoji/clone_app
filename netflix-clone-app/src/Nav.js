import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        console.log(window.screenY)
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])

    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <div className='nav_contents'></div>
            <img
                onClick={() => history.push('/')}
                className='nav_logo'
                src='https://i1.wp.com/freepngimages.com/wp-content/uploads/2016/10/netflix-logo.png?fit=895%2C559'
                alt=''
            />
            <img
                onClick={() => history.push('/profile')}
                className='nav_avatar'
                src='https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png'
                alt=''
            />
        </div>
    )
}

export default Nav
