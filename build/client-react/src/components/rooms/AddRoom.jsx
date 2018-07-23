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
        this.setState({
            [e.target.name]: e.target.value,
            event_id: this.props.event.id
        });
    }
    handleSubmit(e){
        e.preventDefault();
        axios.post(`/api/rooms`, this.state)
        .then((results)=>{
            this.props.updateRooms(results);
        })
        .catch((err)=>{
            console.log('An error has occurred.', err);
            this.setState({
                error: err.response.data
            });
        });
    }
    render(){
        return(
            <div id='room-add'>
                <p className='error-message'>{this.state.error ? this.state.error : ''}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Add Room Topic: </label>
                    <input id='name' name='name' type='text' onChange={this.handleChange}/>
                    <input type='submit' value='submit room'/>
                </form>
            </div>
        )
    }
}
export default AddRoom;