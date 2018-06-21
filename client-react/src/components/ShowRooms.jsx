import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ShowRooms extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: []
        }
    }
    componentDidMount(){
        axios.get('/api/rooms')
        .then((results)=>{
            console.log('did mount get', results.data);
            this.setState({
                rooms: results.data
            });  
        })
        .catch((err)=>{
            console.error(err);
        })  
    }
    render(){
        return (
            <div>
            <h2>All Rooms!</h2>
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