import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            failure: {},
            toDashboard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        console.log("login info", this.state);
        axios.post('/login', this.state)
            .then((results)=>{
                console.log('results.code');
                console.log(results);
                if(results.status === 200){
                    //user should be logged in and redirected to the main with all the eventsn
                    this.props.loginUser(results.data.user);
                    this.setState({
                        toDashboard: true
                    });
                } else {
                    //send status code and failure
                    this.setState({
                        failure: results.message
                    });
                }
            })
            .catch((err)=>{ 
                console.log(err);
            });
    }
    render(){
        if(this.state.toDashboard === true){
            return <Redirect to='/events' />;
        }

        return(
            <form className='user-form' onSubmit={this.handleSubmit}>
                <h3>Please enter info below to login.</h3>
                <p>{this.state.failure ? this.state.failure.success: ''}</p>
                <section>
                    <label htmlFor='email'>Email:</label>
                    <input id='email' name='email' type='email' placeholder='bob@smith.com' onChange={this.handleChange} value={this.state.email}/>
                </section>
                <section>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' name='password' type='password' onChange={this.handleChange} value={this.state.password}/>
                </section>
                <button type='submit' onSubmit={this.handleSubmit}>Login</button>
           </form>
        )
    }
}

export default Login;

// <section>
//                     <label htmlFor='title'>Title</label>
//                     <input id='title' type='text' placeholder='Google Home' onChange={(e) => this.handleChange('title', e)} value={this.state.link.title}/>
//                 </section>
            
//                 <section>
//                     <label htmlFor='description'>Description/Note</label>
//                     <input id='description' type='text' placeholder='How to land the software development job of your DREAMS!' onChange={(e) => this.handleChange('description', e)} value={this.state.link.description}/>
//                 </section>
//<button onClick={()=>this.addLink(this.state.link)}>Add</button>

// {
//     "first_name": "donkey",
//     "last_name": "kong",
//     "email": "help@home.com",
//     "password": "cheese",
//     "failure": {}
// }