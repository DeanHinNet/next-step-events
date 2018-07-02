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
        axios.get('/api/eventbrite')
        .then((results)=>{
            console.log('did mount get eventbrite');
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
            <div id='events-show' className='column'>
                <h2>Upcoming Events!</h2>
                <div id='events-entries'>
                {this.state.events.reduce((result, event, index)=>{
                    result.push(
                        <div key={index} className='event-item'>
                            <div className='event-link'><Link to={`/event/${event.id}/rooms`}>{event.name}</Link></div>
                            <div className='event-description'>{event.description.substring(0,200)}...</div>
                            <div className='event-start'>{event.start_date.substring(5,10)}</div>
                            <div className='event-end'>to {event.end_date.substring(5,10)}</div>
                        </div>
                    );
                    return result;
                }, [])}
                </div>
            </div>
        )
    }
}

export default ShowEvents;