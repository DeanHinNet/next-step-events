import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import AddEvent from './AddEvent.jsx';

class ShowEvents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount(){
        axios.get('/api/events')
        .then((results)=>{
            console.log('did mount get', results.data);
            this.setState({
                events: results.data
            });  
        })
        .catch((err)=>{
            console.error(err);
        })  
    }
    render(){
        return (
            <div>
            <h2>All Events!</h2>
            <p>{this.props.user.name ? "Welcome, " + this.props.user.name : ""}</p>
            {this.state.events.reduce((result, event, index)=>{
                if(Object.keys(this.props.match.params).length === 0){
                    //If the route is '/events' with no parameter, render all events
                    result.push(<div key={index} className='event-item'>
                        <div><Link to={`/event/${event.id}/rooms`}>{event.name}</Link></div>
                        <div>Description: {event.description}</div>
                        <div>Start Date: {event.start_date.substring(0,10)}</div>
                        <div>End Date: {event.end_date.substring(0,10)}</div>
                        <div></div>
                    </div>);
                } else if(event.id === Number(this.props.match.params.id)){
                    //If the route is '/events/:id' with a parameter, render only the selected event
                    result.push(<div key={index} className='event-item'>
                        <div><Link to={`/event/${event.id}/rooms`}>{event.name}</Link></div>
                        <div>Description: {event.description}</div>
                        <div>Start Date: {event.start_date.substring(0,10)}</div>
                        <div>End Date: {event.end_date.substring(0,10)}</div>
                    </div>);
                }
                return result;
            }, [])}
        </div>
        )
    }
}

export default ShowEvents;