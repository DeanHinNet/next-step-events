import React from 'react';
import axios from 'axios';

import AddMessage from './messages/AddMessage.jsx';

class ShowThread extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
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
    render(){
        console.log('threads', this.props);
        console.log('id', this.props.match.params);
        return (
            <div>
                <h3>Discussion{}</h3>
                <AddMessage thread={this.props.match.params}/>
                <ul>
                    {this.state.messages.map((message, index)=>{
                        return <li key={index}>{message.content}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default ShowThread;