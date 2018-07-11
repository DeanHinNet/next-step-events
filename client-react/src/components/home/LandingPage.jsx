import React from 'react';
import SearchBar from './SearchBar.jsx';
import ShowEvents from './../events/ShowEvents.jsx';

const LandingPage = () => (
    <div className='column home home-landing'>
        <SearchBar />
        <div className='home-content'>
        <h2><span id='title-featured'>Featured</span> Events!</h2>
        <ShowEvents />
        </div>
    </div>
)
export default LandingPage;