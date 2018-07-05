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
        this.showAddMessage = this.showAddMessage.bind(this);
    }
    componentDidMount(){
        console.log('show thread props did mount', this.props);
       

        //Gets individual thread
        if(this.props.default === undefined){
            
            this.setState({
                thread: {
                    description: 'No threads have been created yet! Add one!',
                }
            });
        } else {
            console.log('threads props', this.props.default.id );
            if(this.props.thread_id != 0){
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
            } else {
                axios.get(`/api/thread/${this.props.threads.id}`)
                .then((results)=>{
                    console.log('results from thread_id === 0', results);
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
        
        // if(this.props.thread_id != 0){
        //     console.log('this.props.match.params.thread_id', this.props.thread_id);
        //     console.log('match params', this.props);
        //     axios.get(`/api/thread/${this.props.thread_id}`)
        //     .then((results)=>{
        //         console.log('results', results);
        //         this.setState({
        //             thread: results.data.thread[0],
        //             messages: results.data.messages
        //         });
        //     })
        //     .catch((err)=>{
        //         console.error(err);
        //     });
        // } else {
        //     this.setState({
        //         thread: {
        //             description: 'No threads have been created yet! Add one!',
        //         }
        //     });
        // }
     
    }
    updateThread(messages){
        this.setState({
            messages: messages
        })
    }
    showAddMessage(){
        this.setState({
            
        });
    }
    render(){
        console.log('ShowThread state', this.state);
        const isLoggedIn = this.props.isLoggedIn;

        console.log('isLoggedIn', isLoggedIn);

        return (
            <div id='thread-current'>
                <h3>Discussion - {this.state.thread.description || ""}</h3>
                {isLoggedIn ? <AddMessage thread={this.props.match.params} updateThread={this.updateThread}/> : <Login message="Please login to add a message." />}
                
                {this.state.messages.length === 0 ? <p>No messages yet. Please add one!</p> : ""}
                <ul>
                    {this.state.messages.map((message, index)=>{
                        return (
                            <li key={index}>
                            <span className='message-content' >{message.content}</span>
                            <span className='message-stats'>User:{message.username}, Parent:{message.parent_id}, Thread: {message.thread_id}, Message: {message.id}</span>
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