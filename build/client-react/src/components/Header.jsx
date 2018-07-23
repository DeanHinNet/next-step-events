import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => (
    <div className='hero-head navbar is-primary' id='header' >
        <div className='container'>
            <div className='navbar-brand'>
                <Link id='logo' className='navbar-item' to='/'>Next Step Events</Link>
            </div>
            <span className="navbar-burger burger show-burger" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
            </span>
            <div id='navMenu' className='navbar-menu'>
                <div className='navbar-end'>
                    <Link className='navbar-item' to='/'>Home</Link>
                    <Link className='navbar-item' to='/events'>Browse events</Link>
                    <Link className='navbar-item' to='/events/add'>Create new event</Link>
                    {props.isLoggedIn ? <Link className='navbar-item' to='/settings'>Settings</Link>:<Link className='navbar-item' to='/login'>Login</Link>}
                    {props.isLoggedIn ? "": <Link className='navbar-item' to='/register'>Register</Link>}
                </div>
            </div>
        </div>
    </div>
)
export default Header;