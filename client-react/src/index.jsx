import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';

import Navigation from './components/Navigation.jsx';
import Main from './components/main.jsx';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount(){
        // axios.get('/api/events')
        // .then((results)=>{
        //     console.log('did mount get', results.data);
        //     this.setState({
        //         events: results.data
        //     });  
        // })
        // .catch((err)=>{
        //     console.error(err);
        // })  
    }
    render(){
        console.log('index props', this.state.events);
        return(
            
            <div>
                <Navigation />
                <Main events={this.state.events}/>
            </div>
        )
    }
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));
