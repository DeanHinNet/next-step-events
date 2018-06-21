import React from 'react';
import axios from 'axios';

class AddEvent extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            startDate: '',
            endDate: '',
            description: '' 
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e, eventData){
        console.log('hello');
        e.preventDefault();

        eventData.userId = 3;
        eventData.roomId = 3;
        
        axios.post('/api/events', eventData)
            .then((err, data)=>{
                console.log('successfully created event');
            })
            .catch((err)=>{
                console.error(err);
            });
    }
    render(){
        return(
            <div>
                <h3>Add an Event!</h3>
                <form onSubmit={(e)=>this.handleSubmit(e, this.state)}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input id='name' name='name' type='text' value={this.state.name} onChange={this.handleInput} />
                    </div>
                    <div>
                        <label htmlFor='start-date'>Start Date</label>
                        <input id='start-date' name='startDate' type='date' value={this.state.startDate} onChange={this.handleInput} />
                    </div>
                    <div>
                        <label htmlFor='end-date'>End Date</label>
                        <input id='end-date' name='endDate' type='date' value={this.state.endDate} placeholder = {this.state.startDate} onChange={this.handleInput} />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <input id='description' name='description' type='text' value={this.state.description} onChange={this.handleInput} />
                    </div>
                    <input type='submit' id='submit' value='Add Event'/>
                </form>
            </div>
        )
    }
}

export default AddEvent;