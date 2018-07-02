import React from 'react';
import axios from 'axios';

import AddMessage from './messages/AddMessage.jsx';

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
            this.setState({
                thread: {
                    description: 'No threads have been created yet! Add one!',
                }
            });
        }
     
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
        return (
            <div id='thread-current'>
                <h3>Discussion - {this.state.thread.description || ""}</h3>

                <AddMessage thread={this.props.match.params} updateThread={this.updateThread}/>
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