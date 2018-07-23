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
            toDashboard: false,
            username: '',
            isLoggedIn: false,
            message: 'Please login below.'
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
        axios.post('/login', this.state)
            .then((results)=>{
                if(results.status === 200){
                    this.props.loginUser({
                        user: results.data.user,
                        isLoggedIn: true
                    });
                    if(this.props.home){
                        this.setState({
                            toDashboard: true
                        });
                    }
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
        if(this.state.toDashboard){
            return <Redirect to='/' />;
        }
        return(
            <div id='login' className='column has-text-centered'>
                <form className='user-form container has-text-centered input-box' onSubmit={this.handleSubmit}>
                    <h3>{this.props.message ? this.props.message: this.state.message} {this.state.failure ? this.state.failure.success: ''}</h3>
                    <div>
                        <section>
                            <input id='email' name='email' type='email' placeholder='Email: bob@smith.com' onChange={this.handleChange} value={this.state.email} required/>
                        </section>
                        <section>
                            <input id='password' name='password' type='password' onChange={this.handleChange} value={this.state.password} placeholder='password ******'/>
                        </section>
                    </div>
                    <button type='submit' onSubmit={this.handleSubmit}>Login</button>
                </form>
             </div>
        )
    }
}
export default Login;