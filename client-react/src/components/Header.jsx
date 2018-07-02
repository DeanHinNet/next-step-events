import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
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
                    <Link className='navbar-item' to='/login'>Login</Link>
                    <Link className='navbar-item' to='/register'>Register</Link>
                </div>
            </div>
        </div>
    </div>
)

export default Header;

{/* <li><Link to='/rooms'>Show All Rooms</Link></li>
<li><Link to='/rooms/add'>Add Room</Link></li>
<li><Link to='/room/2'>Room 2</Link></li>
 <li><Link to='/events/13'>Event 13</Link></li> 

   <ul className='navbar-menu is-active'>
            <li className='navbar-start' ><Link to='/'>Home</Link></li>
            <li className="navbar-item" id='events-browse'><Link to='/events'>Browse events</Link></li>
            <li className="navbar-item" id='event-register'><Link to='/events/add'>Create new event</Link></li>
            <li className="navbar-item" id='login'><Link to='/login'>Login</Link></li>
            <li className='navbar-end' id='register'><Link to='/register'>Register</Link></li>
        </ul>
    */}

 // <li><Link to='/logout'>Logout</Link></li>