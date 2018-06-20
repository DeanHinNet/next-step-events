import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => (
    <div>
        <h2>Events Navigation</h2>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/events/add'>Add Event</Link></li>
                <li><Link to='/events'>Show All Events</Link></li>
            </ul>
        </nav>
    </div>
)

export default Navigation;