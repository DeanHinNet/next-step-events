import React from 'react';
import SearchBar from './SearchBar.jsx';
import ShowEvents from './../events/ShowEvents.jsx';

const Home = () => (
    <div id='home' className='column'>
        <SearchBar />
        <div id='content'>
            <ShowEvents />
        </div>
    </div>
)

export default Home;

/* 


*/