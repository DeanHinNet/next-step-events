import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';

import ShowMembers from './members/ShowMembers.jsx';
import ShowThreads from './threads/ShowThreads.jsx';

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
        this.updateThreads = this.updateThreads.bind(this);
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
    updateThreads(results){
        this.setState({
            threads: results.data
        });
        
    }
    render(){
        return (
            <div>
                <h2>Single Room - {this.state.room.name}</h2>
                <ul>
                    <li>{this.state.event.name}</li>
                    <li>{this.state.event.start_date}</li>
                    <li>{this.state.event.end_date}</li>
                    <li>{this.state.event.description}</li>
                </ul>
              
                <ShowThreads room={this.state.room.id} threads={this.state.threads} updateThreads={this.updateThreads} />
               
            </div>
        )
    }
}

export default ShowRoom;

//<ShowMembers members={this.state.members}/>