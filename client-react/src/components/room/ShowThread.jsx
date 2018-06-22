import React from 'react';

class ShowThread extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }
    render(){
        console.log('threads', this.props.threads);
        return (
            <div>
                <h3>Discussion Thread</h3>
                <ul>
                    {this.props.threads.map((thread, index)=>{
                        return <li key={index}>{thread.description}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default ShowThread;