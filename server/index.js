var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var fallback = require('express-history-api-fallback');
var util = require('./utility.js');
var model = require('./../database/models/index.js');
var cookieParser = require('cookie-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client-react/dist/'));
// app.use(fallback('index.html', __dirname + '/../client-react/dist/'));
app.use(cookieParser());
app.use(session({
    key: 'user',
    secret: 'not today buddy',
    resave: false,
    saveUninitialized: true
}));

var isLoggedIn = (req)=>{
    console.log('!!req.session.user', !!req.session.user);
    return req.session ? !!req.session.user : false;
}

var checkUser = (req, res, next)=>{
    console.log('checking user');
    console.log('req.session', req.session);
    console.log('req.session.user', req.session.user || 'nope');
    console.log('isLoggedIn', !isLoggedIn(req));
    if(!isLoggedIn(req)) {
        res.status(401).send('Please login to continue.');
    } else {
        next();
    }
}

var createSession = (req, res, user)=>{
    // return req.session.regenerate(()=>{
    //     //console.log('inside create user', user);
    //     req.session.user = user.id;
    //     //console.log('inside create', user.id);
    //   }); 
    return req.session.user = {
        id: user.id,
        first_name: user.first_name
    }
//    return req.session.regenerate(()=>{
//         //console.log('inside create user', user);
//         req.session.user = user.id;
//         //console.log('inside create', user.id);
//       });
    
}
app.use((req, res, next)=>{
    if(req.cookies.users_id && !req.session.user){
        res.clearCookie('user_id');
    }
    next();
});

app.route('/api/events')
    .get((req, res)=>{
        model.events.get((data)=>{
            res.status(201).send(data);
        });
    })
    .post(checkUser,(req, res)=>{
        model.events.post(req.body, req.session.user.id, (data)=>{
            res.status(201).send(data);
        });
    });

// app.get('/api/events', (req, res)=>{
//     model.events.get((data)=>{
//         res.status(201).send(data);
//     });
// });

// app.post('/api/events', util.checkUser, (req, res)=>{
//     model.events.post(req.body, (data)=>{
//         res.status(201).send(data);
//     });
// });

//GET for a single event
app.get('/api/events/:id', (req, res)=>{
   model.event.get(req.params, (data)=>{
        res.status(201).send(data);
   });
});

//Gets a list of all the rooms
app.get('/api/rooms', checkUser, (req, res)=>{
    model.rooms.get((data)=>{
        res.status(201).send(data);
    });
});

//Creates a new room in the collection of rooms
app.post('/api/rooms', checkUser, (req, res)=>{
    model.rooms.post(req.body, (data)=>{
        res.status(201).send(data);
    });
});

//Returns the functionality for a particular room 
app.get('/api/room/:id', (req, res)=>{
    console.log('getting single room');
    model.room.get(req.params,(data)=>{
        res.status(201).send(data);
    });
});

//Bundled get, returns the information for that thread along with all the messages in the thread
app.get('/api/thread/:id', (req, res)=>{
    model.thread.get(req.params, (data)=>{
        res.status(201).send(data);
    });
});

app.get('/api/messages/room/:id/', ()=>{
    console.log('all ', req.params);
    model.messages.get(req.params, (data)=>{
        res.status(201).send(data);
    });
});
//Login Routes

app.post('/login',(req, res)=>{
    model.user.login(req.body, (data)=>{
        //check if user exists and if so check if the password matches if so, create a session
        console.log('app.post ->data', data);
        if(data.code === 200){
            console.log('user_id, session', data.user.id);
            createSession(req, res, data.user);
            console.log('after create session', req.session);
            res.status(data.code).send(data);

            //the user has been checked, the session has been created and the cookie has been delivered to the user's browser

        } else {
            //if not, sendback error message
            res.status(data.code).send(data.success);
        }
    });
});

app.post('/register', (req, res)=>{
    console.log('registering...', JSON.stringify(req.body));
    model.user.register(req.body, (data)=>{
        console.log('after mysql data', data);
        if(data.code === 200){
            console.log('register mysql data', data);
            createSession(req, res, data.user);
            // req.session.user = {
            //     id: data.user.id,
            //     name: data.user.name
            // }
            console.log('after create', req.session);
            console.log(req.session.user);
            console.log('session id', req.session.id);
            res.status(data.code).send(data);

            //the user has been checked, the session has been created and the cookie has been delivered to the user's browser

        } else {
            //if not, sendback error message
            res.status(data.code).send(data);
        }
      
    });
});

app.get('/logout', (req, res)=>{
    console.log('session id', req.session.id);
    req.session.destroy((data)=>{
        res.clearCookie('user', {path: '/'});
        res.status(201).send("You have been logged out.");
    });
});

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Next Step Events is running`);
});