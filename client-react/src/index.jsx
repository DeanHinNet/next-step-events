import React from 'react';
import ReactDOM from 'react-dom';

import AddEvent from './components/AddEvent.jsx';
import AllEvents from './components/AllEvents.jsx';

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
                <AllEvents />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
