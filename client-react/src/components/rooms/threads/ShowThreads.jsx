import React from 'react';
import {Link} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';

import ShowThread from './ShowThread.jsx';
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
        console.log('update threads in show threads');
        this.props.updateThreads(threads);
    }
    render(){
        console.log('show threads -> room', this.props.room);
        var noThreads = true;
        if(this.props.threads.length != 0){
            noThreads = false;
        }
        return (
            <div id='threads-show'>
                <h3>Threads</h3>
                <h4>Add a New Thread</h4>
                <AddThread room={this.props.room} updateThreads={this.updateThreads}/>
                {noThreads ? "No threads yet, please add one!" : ""}
                <ul>
                {this.props.threads.map((thread, index)=>{
                    return <li key={index}><Link to={`/room/${this.props.room}/${thread.id}`}>{thread.description}</Link>
                    <span className='meta-info'>by Bob</span></li>
                })}
                </ul>
             
            </div>
        )
    }
}

export default ShowThreads;

{/* <Switch>
<Route path={`/room/${this.props.room}/thread/:id`} render={(routeProps) =>   
    <ShowThread key={routeProps.match.params.id} {...routeProps}/>}
/>
</Switch> */}