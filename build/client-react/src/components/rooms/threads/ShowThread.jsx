import React from 'react';
import axios from 'axios';
import AddMessage from './../messages/AddMessage.jsx';
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
        this.deleteMessage = this.deleteMessage.bind(this);
    }
    componentDidMount(){
         if(Number(this.props.thread_id) === 0){
            this.setState({
                thread: {
                    description: 'No discussion threads yet. Please add one!'
                }
            });
         } else if(this.props.thread_id != undefined){
            axios.get(`/api/thread/${this.props.thread_id}`)
            .then((results)=>{
                this.setState({
                    thread: results.data.thread[0],
                    messages: results.data.messages
                });
            })
            .catch((err)=>{
                console.log('An error has occurred.', err);
            });   
         }     
    }
    updateThread(messages){
        this.setState({
            messages: messages
        })
    }
    deleteMessage(e){
        console.log('e', e.target.dataset.id);
    }
    render(){
        var context = '';
        !this.state.thread.id ? context = "No threads yet, please create one!" : context="Please login to add a message." 
        return(
            <div id='thread-current'>
                <h3>Discussion: <span id='thread-name'>{this.state.thread.description || ""}</span></h3>
                {this.props.isLoggedIn ? <AddMessage thread_id={this.state.thread.id} updateThread={this.updateThread}/> : <Login location='room' loginUser={this.props.loginUser} message={context}/>}
                {this.state.messages.length === 0 ? <p>No messages yet. Please add one!</p> : ""}
                <ul className='threads-display'>
                    {this.state.messages.map((message, index)=>{
                        return(
                            <li key={message.thread_id+index} className='message-box'>
                                <div className='message-content' dangerouslySetInnerHTML={ {__html: message.content} } ></div>
                                <div className='message-stats'>by {message.username} {this.props.user.username === message.username ? <button onClick={this.deleteMessage}  data-id={message.id}>delete</button>: ''}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default ShowThread;