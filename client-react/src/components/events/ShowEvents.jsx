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
            console.log('did mount get eventbrite', results.data[0]);
            this.setState({
                events: results.data
            });  
        
           
        })
        .catch((err)=>{
            console.error(err);
        })  
    }
    render(){
        const perRow = 3;
        var logo;
        return (
            <div id='events-show' className='column'>
                <h2>Upcoming Events!</h2>
                <div id='events-entries'>
                {this.state.events.reduce((result, event, index)=>{
          
                    if(event.logo != null){
                        logo = event.logo.url;
                    }
                    if(index === 0){
                        result.push(
                            <div key={69+index} className='event-item'>
                            <Link to={`/event/4361188432/rooms`}> <div className='logo'><img src={logo ? logo : '/assets/event-default.jpg'}/></div>
                             <div className='event-link'>DEFAULT</div></Link>
                             <div className='event-description'>description...</div>
                             <div className='event-start'>{event.start_date.substring(5,10)}</div>
                             <div className='event-end'>to {event.end_date.substring(5,10)}</div>
                         </div>
                        );
                        result.push(
                            <div key={68+index} className='event-item'>
                            <Link to={`/event/46995130701/rooms`}> <div className='logo'><img src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F46295521%2F260405887019%2F1%2Foriginal.jpg?w=480&auto=compress&rect=0%2C0%2C9000%2C4500&s=90fa22b347047e599be54dcfd8b5ddd0'/></div>
                             <div className='event-link'>Coinvention</div></Link>
                             <div className='event-description'>description...</div>
                             <div className='event-start'>9/30</div>
                             <div className='event-end'>to 9/30</div>
                         </div>
                        );
                    }
                    result.push(
                        <div key={event.id+index} className='event-item'>
                           <Link to={`/event/${event.id}/rooms`}> <div className='logo'><img src={logo ? logo : '/assets/event-default.jpg'}/></div>
                            <div className='event-link'>{event.name}</div></Link>
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