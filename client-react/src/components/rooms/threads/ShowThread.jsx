import React from 'react';
import axios from 'axios';

import AddMessage from './../messages/AddMessage.jsx';
import {Link} from 'react-router';
import Login from './../../authentication/Login.jsx';
class ShowThread extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            thread: {
                description: ''
            }
        }
        this.updateThread = this.updateThread.bind(this);
       
    }
    componentDidMount(){
        console.log('show thread props did mount', this.props);
        console.log('default', this.props);
         if(Number(this.props.thread_id) === 0){
            this.setState({
                thread: {
                    description: 'No discussion threads yet. Please add one!'
                }
            });
         } else if(this.props.thread_id != undefined){
            console.log('this.props.match.params.thread_id', this.props.thread_id);
            console.log('match params', this.props);
            axios.get(`/api/thread/${this.props.thread_id}`)
            .then((results)=>{
                console.log('results', results);
                this.setState({
                    thread: results.data.thread[0],
                    messages: results.data.messages
                });
            })
            .catch((err)=>{
                console.error(err);
            });   
         }     
    }
    updateThread(messages){
        this.setState({
            messages: messages
        })
    }
    render(){
        console.log('ShowThread state', this.state);
        const isLoggedIn = this.props.isLoggedIn;

        console.log('isLoggedIn', isLoggedIn);

        return (
            <div id='thread-current'>
                <h3>Discussion: {this.state.thread.description || ""}</h3>
                {isLoggedIn ? <AddMessage thread_id={this.state.thread.id} updateThread={this.updateThread}/> : <Login location='room' loginUser={this.props.loginUser} message="Please login to add a message." />}
                
                {this.state.messages.length === 0 ? <p>No messages yet. Please add one!</p> : ""}
                <ul className='threads-display'>
                    {this.state.messages.map((message, index)=>{
                        return (
                            <li key={message.thread_id+index} className='message-box'>
                                <div className='message-content' >{message.content}</div>
                                <div className='message-stats'>by {message.username}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ShowThread;

/*
  

         
*/