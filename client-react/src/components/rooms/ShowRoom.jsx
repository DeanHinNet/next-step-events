import React from 'react';
import axios from 'axios';
import {Switch, Route, Link} from 'react-router-dom';
import {Redirect} from 'react-router';

import ShowMembers from './members/ShowMembers.jsx';
import ShowThreads from './threads/ShowThreads.jsx';
import ShowThread from './threads/ShowThread.jsx';
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
        console.log('showroom');
        console.log('isLoggedIn', this.props.isLoggedIn);
        console.log('user', this.props.user);
        console.log('threads', this.state.threads);
        console.log('throwing down threads', this.state.threads[0]);
        return (
            <div id='room-show' className='columns is-fullheight is-vtop'>
                <div id='room-contents' className='column is-three-quarters'>
                    <h2>{this.state.room.name}</h2>
                   
                    <Switch>
                        <Route path='/room/:id/:thread_id' render={(routeProps) =>
                            <ShowThread {...routeProps} {...this.props} key={routeProps.match.params.thread_id} thread_id={routeProps.match.params.thread_id} isLoggedIn={this.props.isLoggedIn} user={this.props.user}/>
                        }
                        />
                    </Switch>
               </div>
               <div id='room-info'className='column'>
                    <ul id='event-info'>
                        <li>Event Info</li>
                        <li>Name: {this.state.event.name}</li>
                        <li>Description: {this.state.event.description}</li>
                        <li>Start: {this.state.event.start_date}</li>
                        <li>End: {this.state.event.end_date}</li>
                    </ul>
                    <ShowThreads room={this.state.room.id} threads={this.state.threads} updateThreads={this.updateThreads} isLoggedIn={this.props.isLoggedIn} user={this.props.user}/>
               </div>
            </div>
        )
    }
}

export default ShowRoom;

//<ShowMembers members={this.state.members}/>