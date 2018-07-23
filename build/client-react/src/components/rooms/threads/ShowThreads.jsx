import React from 'react';
import {Link} from 'react-router-dom';
import AddThread from './AddThread.jsx';

class ShowThreads extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addThread: false
        }
        this.updateThreads = this.updateThreads.bind(this);
    }
    updateThreads(threads){
        this.props.updateThreads(threads);
    }
    render(){
        const isLoggedIn = this.props.isLoggedIn;
        var noThreads = true;
        if(this.props.threads.length != 0){
            noThreads = false;
        }
        return(
            <div id='threads-show'>
                <h3>Discussion Threads</h3>
                <ul>
                    <li id='threads-empty'>{noThreads ? "No threads yet, please add one!" : ""}</li>
                    {this.props.threads.map((thread, index)=>{
                        return <li key={this.props.room+thread.id+index}><Link to={`/room/${this.props.room}/${thread.id}`}>{thread.description}</Link>
                        {/* <span className='thread-info'> by {thread.username}</span> */}</li>
                    })}
                </ul>
                {isLoggedIn ? <AddThread room={this.props.room} updateThreads={this.updateThreads}/>: ""}
            </div>
        )
    }
}
export default ShowThreads;