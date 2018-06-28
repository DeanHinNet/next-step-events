import React from 'react';
import axios from 'axios';

import AddMessage from './messages/AddMessage.jsx';

class ShowThread extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
        this.updateThread = this.updateThread.bind(this);
        this.showAddMessage = this.showAddMessage.bind(this);
    }
    componentDidMount(){
        console.log('/api/thread/${this.props.match.params}', `/api/thread/${this.props.match.params.id}`);
        axios.get(`/api/thread/${this.props.match.params.id}`)
        .then((results)=>{
            console.log('results', results);
            this.setState({
                thread: results.data.thread,
                messages: results.data.messages
            });
        })
        .catch((err)=>{
            console.error(err);
        });
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
        return (
            <div>
                <h3>Discussion{}</h3>

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