import React from 'react';

class ShowThreads extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            threads: []
        }
    }
    render(){
        return (
            <div>
                <h3>Threads</h3>
                {this.props.threads.map((thread, index)=>{
                    return <li key={index}>{thread.description}</li>
                    })}
            </div>
        )
    }
}

export default ShowThreads;