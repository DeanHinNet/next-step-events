import React from 'react';
import SearchBar from './SearchBar.jsx';
import ShowEvents from './../events/ShowEvents.jsx';

const Home = (props) => {
    console.log('props', props);
    return (
        <div className='column home'>
            <SearchBar />
            <div className='home-content'>
                <ShowEvents />
                <div id='user-welcome'>
                    <p>Welcome {props.user.first_name}!</p>
                </div>
            </div>
        </div>
    )
}

export default Home;
