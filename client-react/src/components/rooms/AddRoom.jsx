import React from 'react';
import axios from 'axios';

class AddRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            event_id: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        console.log('event', this.props.event.id);
        this.setState({
            [e.target.name]: e.target.value,
            event_id: this.props.event.id
        });
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('add room', this.state);
        axios.post(`/api/rooms`, this.state)
        .then((results)=>{
            console.log("add room results", results);
            this.props.updateRooms(results);
        })
        .catch((err)=>{
            console.log('error', err.response.data);
            this.setState({
                error: err.response.data
            });
            console.log(this.state.error);
        });
    }
    render(){
        console.log(typeof this.state.error);
        return(
            <div id='room-add'>
                <h3>Add a Room</h3>
                <p className='error-message'>{this.state.error ? this.state.error : ''}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Discussion Topic</label>
                    <input id='name' name='name' type='text' onChange={this.handleChange}/>
                    <input type='submit' value='submit room'/>
                </form>
            </div>
        )
    }
}

export default AddRoom;