import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './authentication/Login.jsx';
import Register from './authentication/Register.jsx';
import Logout from './authentication/Logout.jsx';

import Home from './home/Home.jsx';
import LandingPage from './home/LandingPage.jsx';
import AddEvent from './events/AddEvent.jsx';
import ShowEvents from './events/ShowEvents.jsx';

import AddRoom from './rooms/AddRoom.jsx';
import ShowRooms from './rooms/ShowRooms.jsx';
import ShowRoom from './rooms/ShowRoom.jsx';

const Main = (props) => {
    return (
    <main className='hero-body is-large'>
        <Switch>
            <Route exact path='/' render={()=>
                props.isLoggedIn ? <Home /> : <LandingPage />}
            />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/login' render={(routeProps) =>   
                <Login {...routeProps} loginUser={props.loginUser}/>}
            />
            <Route exact path='/register' render={(routeProps) =>   
                <Register {...routeProps} loginUser={props.loginUser}/>}
            />
           
            <Route exact path='/events/add' component={AddEvent}/>
            
            <Route exact path='/events' render={(routeProps) =>   
                <ShowEvents {...routeProps} {...props}/>}
            />
            <Route path='/events/:id' render={(routeProps) =>          
                <ShowEvents {...routeProps} {...props}/>}
            />
            <Route exact path='/rooms' render={(routeProps) =>   
                <ShowRooms {...routeProps} isLoggedIn={props.isLoggedIn}/>}
            />
            <Route path='/event/:id/rooms' render={(routeProps) =>          
                <ShowRooms {...routeProps} isLoggedIn={props.isLoggedIn}/>}
            />
            
            <Route exact path='/rooms/add' component={AddRoom}/>
            <Route path='/room/:id/:thread_id' render={(routeProps) =>          
                <ShowRoom {...routeProps} {...props} isLoggedIn={props.isLoggedIn} loginUser={props.loginUser} user={props.user}/>}
            />
          
        </Switch>
    </main>
)}

export default Main;