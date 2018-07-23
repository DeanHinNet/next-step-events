import React from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';

class AddMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            thread_id: '',
            parent_id: '',
            content: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }
    handleInput(value){
        this.setState({
            thread_id: this.props.thread_id,
            content: value
        })
    }
    handleSubmit(e, {value}){
        e.preventDefault();
        axios.post('/api/messages', this.state)
            .then((results)=>{
                this.props.updateThread(results.data.messages);
                this.setState({
                    content: ''
                });
            })
            .catch((err)=>{
                console.log('An error has occurred.', err.response);
                this.setState({
                    error: err.response.data
                });
            });
    }
    render(){
        return(
            <div id='message-add'>
                <h3>Message:</h3>
                <p> {this.state.error ? this.state.error : ""}</p>
                <form onSubmit={(e)=>this.handleSubmit(e, this.state)}>
                    <ReactQuill value={this.state.content} onChange={this.handleInput}/>
                    <input id='message-submit' type='submit' id='submit' value='Submit Message'/>
                </form>
            </div>
        )
    }
}
export default AddMessage;

{/* <textarea id='message-input' name='content' type='textarea' value={this.state.content} onChange={this.handleInput} /> */}