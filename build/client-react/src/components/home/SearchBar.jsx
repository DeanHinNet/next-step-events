import React from 'react';
import {Link} from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            terms: ''
        }
    }
    render(){
        return(
            <div id='banner'>
                <div id='banner-container'>
                    <div id='search-container'>
                        <form id='search-bar'>
                            <p>Connect and grow</p>
                                <div id='search-input'>
                                    <Link to='/about'><button id='started'>Get Started with Next Step Events!</button></Link>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchBar;

/*
   <input type='text' placeholder='Search events and rooms' />
                                <button>Search</button>
*/