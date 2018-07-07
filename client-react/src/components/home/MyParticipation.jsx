import React from 'react';

class MyParticipation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: ''
        }
    }
    render(){
        return(
            <div id='my-participation'>
                <p>My Threads ones I've saved, or added messages in</p>
                <p>My Events ones I've saved or created</p>
            </div>
        )
    }
}

export default MyParticipation;