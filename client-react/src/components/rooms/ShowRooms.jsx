import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import AddRoom from './AddRoom.jsx';

class ShowRooms extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            event: {},
            error: ""
        }
        this.updateRooms = this.updateRooms.bind(this);
    }
    componentDidMount(){
        console.log('getting events?',this.props.match.params);
        if(Object.keys(this.props.match.params).length > 0){
            console.log('getting rooms for event');
            axios.get(`/api/event/${this.props.match.params.id}/rooms`)
            .then((results)=>{
                console.log('did mount get', results.data);
                this.setState({
                    rooms: results.data.rooms,
                    event: results.data.event
                });  
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
            rooms: results.data.room
        });
    }   
    render(){
        return (
            <div>
            <h2>All Rooms!</h2>
            <AddRoom event={this.props.match.params} updateRooms={this.updateRooms}/>
            {this.state.error ? this.state.error : ""}
            {this.state.rooms.map((room, index)=>{
                return (
                    <div key={index} className='room-item'>
                        <div>Name: <Link to={`/room/${room.id}`}>{room.name}</Link></div>

                    </div>
                )
            })}
        </div>
        )
    }
}

export default ShowRooms;