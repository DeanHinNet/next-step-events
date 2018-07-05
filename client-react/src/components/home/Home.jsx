import React from 'react';
import SearchBar from './SearchBar.jsx';
import ShowEvents from './../events/ShowEvents.jsx';

const Home = () => (
    <div className='column home'>
        <SearchBar />
        <div className='home-content'>
            <ShowEvents />
        </div>
    </div>
)

export default Home;

/* 


*/