import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, browserHistory} from 'react-router-dom';
import axios from 'axios';

//import './preprocessor/style.scss';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                first_name: '',
                username: '',
                id: ''
            },
            isLoggedIn: false
        }
        this.loginUser = this.loginUser.bind(this);
    }
    componentDidMount(){
        console.log('component did mount checking loggin');
        axios.get('/login')
        .then((results)=>{
            console.log('results', results);
            if(results.status === 200){
                this.loginUser({
                    user: results.data.user,
                    isLoggedIn: true
                });
            } else {
                //send status code and failure
                this.setState({
                    failure: results.message
                });
            }
        })
        .catch((err)=>{
            console.log('No user is logged in.');
        });
    }
    loginUser(data){
        //Sets the state for 'isLoggedIn' once the user is authenticated
        this.setState({
            user: data.user,
            isLoggedIn: data.isLoggedIn
        });
    }
    render(){
        return(
            <div className='hero is-fullheight'>
                <Header isLoggedIn={this.state.isLoggedIn}/>
                <Main events={this.state.events} loginUser={this.loginUser} user={this.state.user} isLoggedIn={this.state.isLoggedIn}/>
                <Footer/>
            </div>
        )
    }
}

ReactDOM.render((
    <BrowserRouter history={browserHistory}>
        <App />
    </BrowserRouter>
), document.getElementById('app'));
