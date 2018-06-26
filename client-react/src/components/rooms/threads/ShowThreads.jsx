import React from 'react';
import {Link} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';

import ShowThread from './ShowThread.jsx';

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
                <ul>
                {this.props.threads.map((thread, index)=>{
                    return <li key={index}><Link to={`/room/${this.props.room}/thread/${thread.id}`}>{thread.description}</Link></li>
                })}
                </ul>
                <Switch>
                    <Route path={`/room/${this.props.room}/thread/:id`} render={(routeProps) =>   
                        <ShowThread key={routeProps.match.params.id} {...routeProps}/>}
                    />
                </Switch>
            </div>
        )
    }
}

export default ShowThreads;