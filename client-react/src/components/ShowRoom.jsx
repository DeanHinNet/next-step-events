import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import ShowMembers from './room/ShowMembers.jsx';
import ShowThreads from './room/ShowThreads.jsx';

class ShowRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            room: {},
            threads: [],
            members: [],
            event: {
                name: '',
                start_date: '',
                end_date: '',
                description: ''
            }
        }
    }
    componentDidMount(){
        axios.get(`/api/room/${this.props.match.params.id}`)
        .then((results)=>{
            console.log('room results data', results);
            this.setState(results.data);  
        })
        .catch((err)=>{
            console.error(err);
        })  
    }
    render(){
        console.log('state', this.state);
        return (
            <div>
                <h2>Single Room - {this.state.room.name}</h2>
                <ul>
                    <li>{this.state.event.name}</li>
                    <li>{this.state.event.start_date}</li>
                    <li>{this.state.event.end_date}</li>
                    <li>{this.state.event.description}</li>
                </ul>
                <ShowMembers members={this.state.members}/>
                <ShowThreads threads={this.state.threads}/>
            </div>
        )
    }
}

export default ShowRoom;