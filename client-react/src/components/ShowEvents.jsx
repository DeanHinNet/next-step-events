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
        console.log('PROPS,', this.props);
        return (
            <div>
            <h2>All Events! {this.props.user.name ? "Welcome, " + this.props.user.name : ""}</h2>
            {this.state.events.reduce((result, event, index)=>{
                if(Object.keys(this.props.match.params).length === 0){
                    //If the route is '/events' with no parameter, render all events
                    result.push(<div key={index} className='event-item'>
                        <div>Name: {event.name}</div>
                        <div>Description: {event.description}</div>
                        <div>Start Date: {event.start_date.substring(0,10)}</div>
                        <div>End Date: {event.end_date.substring(0,10)}</div>
                    </div>);
                } else if(event.id === Number(this.props.match.params.id)){
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
}

export default ShowEvents;