import React from 'react';
import axios from 'axios';
import {Switch, Route} from 'react-router-dom';
import ShowThreads from './threads/ShowThreads.jsx';
import ShowThread from './threads/ShowThread.jsx';

class ShowRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            room: {},
            threads: [],
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
        axios.get(`/api/room/${this.props.match.params.id}`)
        .then((results)=>{
            this.setState({
                event: results.data.event,
                threads: results.data.threads,
                room: results.data.room
            });  
        })
        .catch((err)=>{
            console.log('An error has occurred.', err);
        })  
    }
    updateThreads(results){
        this.setState({
            threads: results.data
        });
    }
    render(){
        return (
            <div id='room-show' className='columns is-fullheight is-vtop'>
                <div id='room-contents' className='column is-three-quarters'>
                    <div id='event-info'>
                        <div id='event-name'>{this.state.event.name}</div>
                        <div className='content-title'>Description: </div>
                        <div id='event-desc-show' tabIndex='1'>Show</div>
                        <div id='event-desc-hide' tabIndex='2'>Hide,</div>
                        <div className='content-title'>Dates: </div>
                        <div id='event-dates'>{this.state.event.start_date} to {this.state.event.end_date}</div>
                        <div id='event-description'>{this.state.event.description}</div>
                    </div>
                    <h2 id='room-name'>{this.state.room.name}</h2>
                    <Switch>
                        <Route path='/room/:id/:thread_id' render={(routeProps) =>
                            <ShowThread {...routeProps} {...this.props} key={routeProps.match.params.id+routeProps.match.params.thread_id} thread_id={routeProps.match.params.thread_id} isLoggedIn={this.props.isLoggedIn} user={this.props.user} loginUser={this.props.loginUser}/>}
                        />
                    </Switch>
               </div>
               <div id='side-bar' className='column'>
                    <ShowThreads room={this.state.room.id} threads={this.state.threads} updateThreads={this.updateThreads} isLoggedIn={this.props.isLoggedIn} user={this.props.user} loginUser={this.props.loginUser}/>
                    <div id='event-pics'>
                        <img src={`${this.state.event.logo_url}`} />
                    </div>
               </div>
            </div>
        )
    }
}
export default ShowRoom;