import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => (
    <div>
        <h2>Events Navigation</h2>
        <nav>
            <ul>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
                
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/events/add'>Add Event</Link></li>
                <li><Link to='/events'>Show All Events</Link></li>
                <li><Link to='/events/13'>Event 13</Link></li>

                <li><Link to='/rooms/add'>Add Room</Link></li>
                <li><Link to='/rooms'>Show All Rooms</Link></li>
                <li><Link to='/room/2'>Room 2</Link></li>
            </ul>
        </nav>
    </div>
)

export default Navigation;