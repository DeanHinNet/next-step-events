import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddRoom from './AddRoom.jsx';

class ShowRooms extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            event: {
                id: '',
                name: ''
            },
            status: ''
        }
        this.updateRooms = this.updateRooms.bind(this);
    }
    componentDidMount(){
        if(Object.keys(this.props.match.params).length > 0){
            axios.get(`/api/event/${this.props.match.params.id}/rooms`)
            .then((results)=>{
                console.log('getting rooms', results);
                if(results.data.rooms.length === 0){
                    this.setState({
                        rooms: [{
                            id: '',
                            description: '',
                            start_date: '',
                            end_date: ''
                        }],
                        event: results.data.event,
                        status: 'No rooms yet for this event.'
                    }); 
                } else {
                    this.setState({
                        rooms: results.data.rooms,
                        event: results.data.event
                    });  
                }
            })
            .catch((err)=>{
                console.log('An error has occurred.', err);
                this.setState({
                    error: err.response
                });
            })  
        } else {
            axios.get('/api/rooms')
            .then((results)=>{
                this.setState({
                    rooms: results.data
                });  
            })
            .catch((err)=>{
                this.setState({
                    error: err.response
                });
            })  
        }
    }
    updateRooms(results){
        this.setState({
            event: results.data.event,
            rooms: results.data.rooms
        });
    }   
    render(){
        var roomsCreated = true;
        if(this.state.rooms.length != 0){
            roomsCreated = false;
        }
        return(
            <div id='rooms-show' className='column'>
                <h2 className='room-event-name' data-event-id={this.state.event.id}>{this.state.event.name}</h2>
                {this.props.isLoggedIn ? <AddRoom event={this.props.match.params} updateRooms={this.updateRooms}/>: "Please login to create a new room."}
                <div id='rooms-list'>
                    <h2>Current Rooms: {this.state.status ? this.state.status : ""}</h2>
                    {this.state.rooms.map((room, index)=>{
                        return (
                            <div key={room.id} className='room-item'>
                                <div className='room-name'>
                                    <Link to={`/room/${room.id}/${ room.thread_id ? room.thread_id: 0}`}>{room.name}</Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default ShowRooms;

/*
  <div className='room-info'>{this.state.status ? '' : 'by'} </div>
*/