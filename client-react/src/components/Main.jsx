import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Home.jsx';
import AddEvent from './AddEvent.jsx';
import ShowEvents from './ShowEvents.jsx';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/events' component={ShowEvents}/>
            <Route exact path='/events/add' component={AddEvent}/>
        </Switch>
    </main>
)

export default Main;