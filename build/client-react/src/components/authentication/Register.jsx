import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
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
        axios.post('/api/user', this.state)
            .then((results)=>{
                if(results.status === 200){
                    //user should be logged in and redirected to the main with all the eventsn
                    this.props.loginUser({
                        user:results.data.user,
                        isLoggedIn: true});
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
            return <Redirect to='/' />;
        }
        return(
            <div className='column has-text-centered'>
                <form className='user-form container has-text-centered input-box' onSubmit={this.handleSubmit}>
                    <h3>Please create an account below.</h3>
                    <p>{this.state.failure ? this.state.failure.success: ''} </p>
                    <section>
                        <label htmlFor='first-name'>First Name:</label>
                        <input id='first-name' name='first_name' type='text' placeholder='Bob' onChange={this.handleChange} value={this.state.first_name}/>
                    </section>
                    <section>
                        <label htmlFor='last-name'>Last Name:</label>
                        <input id='last-name' name='last_name' type='text' placeholder='Smith' onChange={this.handleChange} value={this.state.last_name}/>
                    </section>
                    <section>
                        <label htmlFor='username'>Username:</label>
                        <input id='username' name='username' type='text' placeholder='bobxxor' onChange={this.handleChange} value={this.state.username}/>
                    </section>
                    <section>
                        <label htmlFor='email'>Email:</label>
                        <input id='email' name='email' type='email' placeholder='bob@smith.com' onChange={this.handleChange} value={this.state.email}/>
                    </section>
                    <section>
                        <label htmlFor='password'>Password:</label>
                        <input id='password' name='password' type='password' onChange={this.handleChange} value={this.state.password}/>
                    </section>
                    <button type='submit' onSubmit={this.handleSubmit}>Submit</button>
            </form>
           </div>
        )
    }
}
export default Register;