import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';

import './preprocessor/style.scss';

import Header from './components/Header.jsx';
import Main from './components/main.jsx';
import Footer from './components/footer.jsx';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                first_name: '',
                id: ''
            },
            isLoggedIn: false,
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
        //Sets the state for 'isLoggedIn' once the user is authenticated
        console.log('setting this.state.isLoggedIn', data);
        this.setState({
            user: data.user,
            isLoggedIn: data.isLoggedIn
        });
    }
    render(){
        return(
            <div className='hero is-fullheight'>
                <Header/>
                <Main events={this.state.events} loginUser={this.loginUser} user={this.state.user} isLoggedIn={this.state.isLoggedIn}/>
                <Footer/>
            </div>
        )
    }
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));
