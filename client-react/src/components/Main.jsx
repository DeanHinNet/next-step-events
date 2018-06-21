import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Home.jsx';
import AddEvent from './AddEvent.jsx';
import ShowEvents from './ShowEvents.jsx';
import AddRoom from './AddRoom.jsx';
import ShowRooms from './ShowRooms.jsx';

const Main = (props) => {
    console.log('main props', props);
    return (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/events/add' component={AddEvent}/>
            <Route exact path='/events' render={(routeProps) =>   
                <ShowEvents {...routeProps} {...props}/>}
            />
            <Route path='/events/:id' render={(routeProps) =>          
                <ShowEvents {...routeProps} {...props}/>}
            />
            <Route exact path='/rooms/add' component={AddRoom}/>
            <Route exact path='/rooms' render={(routeProps) =>   
                <ShowRooms {...routeProps} {...props}/>}
            />
            <Route path='/rooms/:id' render={(routeProps) =>          
                <ShowRooms {...routeProps} {...props}/>}
            />
            
            <Route path='/room/:id' render={(routeProps) =>          
                <ShowRoom {...routeProps} {...props}/>}
            />


        </Switch>
    </main>
)}

export default Main;
//<Route exact path='/events' component={ShowEvents}/>
// <Route exact path='/rooms' component={ShowRooms}/>
// <Route exact path='/rooms/add' component={AddRoom}/>