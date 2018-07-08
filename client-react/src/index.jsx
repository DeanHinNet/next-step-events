import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, browserHistory} from 'react-router-dom';
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
                username: '',
                id: ''
            },
            isLoggedIn: false
        }
        this.loginUser = this.loginUser.bind(this);
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
