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
    componentWillMount(){
        console.log('show room-component will mount');
        console.log('match',this.props);
        console.log('url',`/api/room/${this.props.match.params.id}`);
        axios.get(`/api/room/${this.props.match.params.id}`)
        .then((results)=>{
            console.log('room results data', results);
            this.setState({
                event: results.data.event,
                threads: results.data.threads,
                room: results.data.room
            });  
        })
        .catch((err)=>{
            console.log('room results err', err);
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
        console.log('props', this.props);
        console.log('threads', this.state.threads);
        console.log('throwing down threads', this.state.threads[0]);
        return (
            <div id='room-show' className='columns is-fullheight is-vtop'>
                <div id='room-contents' className='column is-three-quarters'>
                    <div id='event-info'>
                        <div id='event-name'>{this.state.event.name}</div>
                        <div className='content-title'>Description: </div>
                        <div id='event-desc-show' tabindex='1'>Show</div>
                        <div id='event-desc-hide' tabindex='2'>Hide,</div>
                        <div className='content-title'>Dates: </div>
                        <div id='event-dates'>{this.state.event.start_date} to {this.state.event.end_date}</div>
                        
                        <div id='event-description'>{this.state.event.description}</div>
                       
                    </div>
         
                    <h2 id='room-name'>{this.state.room.name}</h2>
                   
                    <Switch>
                        <Route path='/room/:id/:thread_id' render={(routeProps) =>
                            <ShowThread {...routeProps} {...this.props} key={routeProps.match.params.id+routeProps.match.params.thread_id} thread_id={routeProps.match.params.thread_id} isLoggedIn={this.props.isLoggedIn} user={this.props.user} loginUser={this.props.loginUser}/>
                        }
                        />
                    </Switch>
               </div>
               <div id='side-bar' className='column'>
                    <ShowThreads room={this.state.room.id} threads={this.state.threads} updateThreads={this.updateThreads} isLoggedIn={this.props.isLoggedIn} user={this.props.user} loginUser={this.props.loginUser}/>
               </div>
            
            </div>
        )
    }
}

export default ShowRoom;

//<ShowMembers members={this.state.members}/>