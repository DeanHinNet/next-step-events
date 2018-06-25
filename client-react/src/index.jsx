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
            user: {
                first_name: '',
                id: ''
            },
            events: []
        }
        this.loginUser = this.loginUser.bind(this);
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
    loginUser(data){
        console.log('this.loginUser', data);
        this.setState({
            user: data
        });
    }
    render(){
        console.log('index props', this.state.events);
        return(
            <div>
                <Navigation />
                <Main events={this.state.events} loginUser={this.loginUser} user={this.state.user}/>
            </div>
        )
    }
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));
