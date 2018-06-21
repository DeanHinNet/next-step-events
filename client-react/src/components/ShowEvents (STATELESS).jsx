import React from 'react';

const ShowEvents = (props) => {
    return (
        <div>
            <h2>All Events!</h2>
            {props.events.reduce((result, event, index)=>{
                if(Object.keys(props.match.params).length === 0){
                    //If the route is '/events' with no parameter, render all events
                    result.push(<div key={index} className='event-item'>
                        <div>Name: {event.name}</div>
                        <div>Description: {event.description}</div>
                        <div>Start Date: {event.start_date.substring(0,10)}</div>
                        <div>End Date: {event.end_date.substring(0,10)}</div>
                    </div>);
                } else if(event.id === Number(props.match.params.id)){
                    //If the route is '/events/:id' with a parameter, render only the selected event
                    result.push(<div key={index} className='event-item'>
                        <div>Name: {event.name}</div>
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

export default ShowEvents;
