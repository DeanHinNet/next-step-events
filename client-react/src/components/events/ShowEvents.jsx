import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ShowEvents extends React.Component {
    constructor(){
        super();
        this.state = {
            events: []
        }
    }
    componentDidMount(){
        axios.get('/api/eventbrite/featured')
        .then((results)=>{
            this.setState({
                events: results.data
            });  
        })
        .catch((err)=>{
            console.error(err);
        })  
    }
    render(){
        if(this.state.events.length > 0){
            return (
                <div id='events-show' className='column'>
                    <div id='events-entries'>
                    {this.state.events.map((event, index)=>{
                        return (
                            <div key={event.id+index} className={event.featured ? 'event-item yes featured':'event-item yes'}>
                            <Link to={`/event/${event.id}/rooms`}> <div className='logo'><img src={event.logo.url}/></div>
                                <div className='event-link'>{event.name}</div></Link>
                                <div className='event-description'>{event.description.substring(0,200)}...</div>
                                <div className='event-start'>{event.start_date} to {event.end_date}, {event.start_time}-{event.end_time}</div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            )
        }
        return (
            <div className='loading'>
                <div id='loader' className="lds-css ng-scope">
                    <div id='spinner' className="lds-spinner spinner" >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
          )
    }
}
export default ShowEvents;