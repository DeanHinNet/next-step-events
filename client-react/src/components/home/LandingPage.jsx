import React from 'react';
import SearchBar from './SearchBar.jsx';
import ShowEvents from './../events/ShowEvents.jsx';

const LandingPage = () => (
    <div className='column home home-landing'>
        <SearchBar />
        <div className='home-content'>
        <ShowEvents />
        </div>
    </div>
)

export default LandingPage;

/* 


*/