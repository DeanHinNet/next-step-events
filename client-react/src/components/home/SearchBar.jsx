import React from 'react';

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
                                <input type='text' placeholder='Search events and rooms' />
                                <button>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchBar;
