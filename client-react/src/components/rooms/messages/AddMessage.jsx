import React from 'react';
import axios from 'axios';

class AddMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            thread_id: this.props.thread_id,
            parent_id: '',
            content: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        axios.post('/api/messages', this.state)
            .then((results)=>{
                console.log('messages post udata', results.data.messages);
                this.props.updateThread(results.data.messages);
                this.setState({
                    content: ''
                });
            })
            .catch((err)=>{
                console.error(err);
                console.log('error', err.response);
                this.setState({
                    error: err.response.data
                });
            });
    }
    render(){
        return(
            <div id='message-add'>
                <h3>Add an Message!</h3>
                <p> {this.state.error ? this.state.error : ""}</p>
                <form onSubmit={(e)=>this.handleSubmit(e, this.state)}>
                    
                    <textarea id='message-input' name='content' type='textarea' value={this.state.content} onChange={this.handleInput} />
                    
                    <input id='message-submit' type='submit' id='submit' value='Submit Message'/>
                </form>
            </div>
        )
    }
}

export default AddMessage;