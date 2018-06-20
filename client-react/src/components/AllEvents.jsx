import React from 'react';
import axios from 'axios';

class AllEvents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount(){
        axios.get('/events')
        .then((results)=>{
            console.log('did mount get', results);
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
                {this.state.events.map((event)=>{
                    return <div>{event.name}</div>;
                })}
            </div>
        )
    }
}

export default AllEvents;