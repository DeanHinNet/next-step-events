import React from 'react';

class ShowMessages extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }
    render(){
        return(
            <div>MESSAGES!</div>
        )
    }
}

export default ShowMessages;