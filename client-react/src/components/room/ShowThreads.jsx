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
    // componentDidMount(){
    //     console.log('/api/thread/all', `/api/thread/${this.props.match.params.id}`);
    //     axios.get(`/api/messages/room/${this.props.match.params.id}`)
    //     .then((results)=>{
    //         console.log('results', results);
    //         this.setState({
    //             thread: results.data
    //         });
    //     })
    //     .catch((err)=>{
    //         console.error(err);
    //     });
    // }
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