import React from 'react';
import ReactDOM from 'react';

import AddEvent from './components/AddEvent.jsx';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }
    render(){
        return(
            <div>
                <AddEvent />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
