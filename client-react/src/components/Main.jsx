import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './authentication/Login.jsx';
import Register from './authentication/Register.jsx';
import Logout from './authentication/Logout.jsx';

import Home from './Home.jsx';
import AddEvent from './events/AddEvent.jsx';
import ShowEvents from './events/ShowEvents.jsx';

import AddRoom from './rooms/AddRoom.jsx';
import ShowRooms from './rooms/ShowRooms.jsx';
import ShowRoom from './rooms/ShowRoom.jsx';

const Main = (props) => {
    return (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
          
            <Route exact path='/logout' component={Logout} />
      
            <Route exact path='/login' render={(routeProps) =>   
                <Login {...routeProps} {...props}/>}
            />
            <Route exact path='/register' render={(routeProps) =>   
                <Register {...routeProps} {...props}/>}
            />

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

//<Route path="*" render={() => (<Redirect to="/" />)} />