import React from 'react';
import axios from 'axios';

class AddEvent extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            start_date: '',
            end_date: '',
            description: '' 
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount(){
        
    }
    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e, eventData){
        e.preventDefault();
        
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
            <div className='column'>
                <div className='container has-text-centered input-box'>
                    <h3>Add an Event!</h3>
                    <form onSubmit={(e)=>this.handleSubmit(e, this.state)}>
                        <div>
                            <label htmlFor='name'>Event Name</label>
                            <input id='name' name='name' type='text' value={this.state.name} onChange={this.handleInput} />
                        </div>
                        <div>
                            <label htmlFor='start-date'>Start Date</label>
                            <input id='start-date' name='start_date' type='date' value={this.state.start_date} onChange={this.handleInput} />
                        </div>
                        <div>
                            <label htmlFor='end-date'>End Date</label>
                            <input id='end-date' name='end_date' type='date' value={this.state.end_date} placeholder = {this.state.start_date} onChange={this.handleInput} />
                        </div>
                        <div>
                            <label htmlFor='description'>Description</label>
                            <input id='description' name='description' type='text' value={this.state.description} onChange={this.handleInput} />
                        </div>
                        <input type='submit' id='submit' value='Add Event'/>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddEvent;