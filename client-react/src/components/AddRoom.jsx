import React from 'react';

class AddRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: {}
        }
    }
    render(){
        return(
            <div>
                <h3>Add a Room</h3>
            </div>
        )
    }
}

export default AddRoom;