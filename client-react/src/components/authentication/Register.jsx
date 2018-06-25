import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
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
        axios.post('/register', this.state)
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
                <h3>Please enter info below to create an account.</h3>
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
                    <label htmlFor='email'>Email:</label>
                    <input id='email' name='email' type='email' placeholder='bob@smith.com' onChange={this.handleChange} value={this.state.email}/>
                </section>
                <section>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' name='password' type='password' onChange={this.handleChange} value={this.state.password}/>
                </section>
                <button type='submit' onSubmit={this.handleSubmit}>Submit</button>
           </form>
        )
    }
}

export default Register;

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