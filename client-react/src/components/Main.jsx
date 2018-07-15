import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Register from './authentication/Register.jsx';
import Login from './authentication/Login.jsx';
import Logout from './authentication/Logout.jsx';
import Settings from './authentication/Settings.jsx';
import About from './home/About.jsx';
import Home from './home/Home.jsx';
import LandingPage from './home/LandingPage.jsx';
import ShowEvents from './events/ShowEvents.jsx';
import AddEvent from './events/AddEvent.jsx';
import ShowRooms from './rooms/ShowRooms.jsx';
import ShowRoom from './rooms/ShowRoom.jsx';
import AddRoom from './rooms/AddRoom.jsx';

const Main = (props) => {
    return (
    <main className='hero-body is-large'>
        <Switch>
            <Route exact path='/' render={()=>
                props.isLoggedIn ? <Home user={props.user}/> : <LandingPage />}
            />
             <Route exact path='/register' render={(routeProps) =>   
                <Register {...routeProps} loginUser={props.loginUser}/>}
            />
              <Route exact path='/login' render={(routeProps) =>   
                <Login {...routeProps} loginUser={props.loginUser}  home={true}/>}
            />
            <Route exact path='/about' component={About} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/logout' render={() =>   
                <Logout loginUser={props.loginUser} home={true}/>}
            />
            <Route exact path='/events' render={(routeProps) =>   
                <ShowEvents {...routeProps}/>}
            />
             <Route exact path='/events/add' component={AddEvent}/>
             <Route path='/events/:id' render={(routeProps) =>          
                <ShowEvents {...routeProps}/>}
            />
           
            <Route exact path='/rooms' render={(routeProps) =>   
                <ShowRooms {...routeProps} isLoggedIn={props.isLoggedIn}/>}
            />
            <Route path='/event/:id/rooms' render={(routeProps) =>          
                <ShowRooms {...routeProps} isLoggedIn={props.isLoggedIn}/>}
            />
            <Route path='/room/:id/:thread_id' render={(routeProps) =>          
                <ShowRoom {...routeProps} isLoggedIn={props.isLoggedIn} loginUser={props.loginUser} user={props.user}/>}
            />
            <Route exact path='/rooms/add' component={AddRoom}/>
        </Switch>
    </main>
)}
export default Main;