import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ShowRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: []
        }
    }
    componentDidMount(){
        axios.get(`/api/room/${this.props.match.params.id}`)
        .then((results)=>{
            console.log('did mount get', results.data);
            this.setState({
                rooms: results.data
            });  
        })
        .catch((err)=>{
            console.error(err);
        })  
    }
    render(){
        return (
            <div>
                <h2>Single Room</h2>
            </div>
        )
    }
}

export default ShowRoom;