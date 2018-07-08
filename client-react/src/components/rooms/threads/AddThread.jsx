import React from 'react';
import axios from 'axios';

class AddThread extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: '',
            room_id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            room_id: this.props.room
        });
    }
    handleSubmit(e){
        e.preventDefault();
        axios.post('/api/thread', this.state)
            .then((results)=>{
                this.props.updateThreads(results);
            })
            .catch((err)=>{
                console.log('An error has occurred.', err);
            });

    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            {this.state.error ? this.state.error:''}
                <div>
                    <label htmlFor='description'>Description</label>
                    <input id='description' name='description' type='text' value={this.state.description} onChange={this.handleChange}/>
                </div>
                <input id='submit' type='submit' value='Submit Thread' />
            </form>
        )
    }
}
export default AddThread;