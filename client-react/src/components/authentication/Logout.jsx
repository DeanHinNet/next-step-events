import React from 'react';
import axios from 'axios';

class Logout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            response: ""
        }
    }
    componentDidMount(){
        console.log('logout-did mount');
        axios.get('/logout')
        .then((results)=>{
            this.setState({
                response: results.data
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render(){
        return (
            <div>
                {this.state.response ? this.state.response : ""}
            </div>
        )
    }
}

export default Logout;