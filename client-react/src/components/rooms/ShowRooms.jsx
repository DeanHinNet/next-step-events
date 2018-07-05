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
                console.log('did mount get', results.data);
                console.log(results.data.rooms.length);
                if(results.data.rooms.length === 0){
                    console.log('inside results', results.data);
                    console.log('this.state', this.state); 
                    this.setState({
                        rooms: [{
                            id: '',
                            description: '',
                            start_date: '',
                            end_date: ''
                        }],
                        event: results.data.event,
                        status: 'No rooms yet for this event!'
                    }); 
                 
                } else {
                    console.log('inside results with rooms', this.state); 
                    this.setState({
                        rooms: results.data.rooms,
                        event: results.data.event
                    });  
                }
               
            })
            .catch((err)=>{
                this.setState({
                    error: err.response
                });
            })  
        } else {
            console.log('getting all rooms');
            axios.get('/api/rooms')
            .then((results)=>{
                console.log('did mount get', results.data);
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
        console.log("update room results", results);
        this.setState({
            event: results.data.event,
            rooms: results.data.rooms
        });
    }   
    render(){
        console.log('this is state', this.state); 
        const isLoggedIn = this.props.isLoggedIn;
        var roomsCreated = true;

        if(this.state.rooms.length != 0){
            roomsCreated = false;
        }
        return (
            <div id='rooms-show' className='column'>
                <h2 className='room-event-name' data-event-id={this.state.event.id}>Showing rooms for {this.state.event.name}</h2>
                

                  {isLoggedIn ? <AddRoom event={this.props.match.params} updateRooms={this.updateRooms}/>: <p>Please <Link to='/login'>login</Link> to add a new room!</p>}
                {roomsCreated ? "No threads yet, please add one!" : ""}

                {this.state.status ? this.state.status : ""}
                {this.state.rooms.map((room, index)=>{
                    return (
                        <div key={index} className='room-item'>
                            <div className='room-name'><Link to={`/room/${room.id}/0`}>{room.name}</Link></div>
                            <div className='room-info'>{this.state.status ? 'by' : ""} </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ShowRooms;