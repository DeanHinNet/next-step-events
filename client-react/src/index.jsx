import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Navigation from './components/Navigation.jsx';
import Main from './components/main.jsx';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }
    render(){
        return(
            <div>
                <Navigation />
                <Main />
            </div>
        )
    }
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));
