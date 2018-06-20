import React from 'react';
import axios from 'axios';

class ShowEvents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount(){
        axios.get('/events')
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
                {this.state.events.map((event, index)=>{
                    return (<div key={index} className='event-item'>
                        <div>Name: {event.name}</div>
                        <div>Description: {event.description}</div>
                        <div>Start Date: {event.start_date.substring(0,10)}</div>
                        <div>End Date: {event.end_date.substring(0,10)}</div>
                    </div>)
                })}
            </div>
        )
    }
}

export default ShowEvents;