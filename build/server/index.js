var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var util = require('./utility.js');
var model = require('./../database/models/index.js');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var port = process.env.PORT || 8080;

var app = express();

app.use(compression({filter: util.shouldCompress}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client-react/dist/'));
app.use(cookieParser());
app.use(session({
    key: 'user',
    secret: 'this is only the beginnning',
    store: model.sessionStore,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next)=>{
    if(req.cookies.users_id && !req.session.user){
        res.clearCookie('user_id');
    }
    next();
});

//External APIS
app.get('/api/eventbrite/featured', (req, res)=>{
    model.eventBrite.featured((data)=>{
        res.status(201).send(data);
    });
});

app.route('/api/events')
    //GET all non-external events.
    .get((req, res)=>{
        model.events.get((data)=>{
            res.status(201).send(data);
        });
    })
    .post(util.checkUser,(req, res)=>{
        model.events.post(req.body, req.session.user.id, (data)=>{
            res.status(201).send(data);
        });
    });
//GET for a single event
app.get('/api/events/:id', (req, res)=>{
    model.event.get(req.params, (data)=>{
         res.status(201).send(data);
    });
 });
//GETS the info for all the rooms of a particular event
app.get('/api/event/:id/rooms', (req, res)=>{
    model.event.rooms.get(req.params, (data)=>{
        res.status(201).send(data);
    });
})
app.route('/api/rooms')
    .get((req, res)=>{
        //Gets a list of all the rooms
        model.rooms.get((data)=>{
            res.status(201).send(data);
        });
    })
    .post(util.checkUser, (req, res)=>{
        //Creates a new room in the collection of rooms
        model.rooms.post(req.body, req.session.user.id, (data)=>{
            res.status(201).send(data);
        });
    });
//Returns the functionality for a particular room 
app.get('/api/room/:id', (req, res)=>{
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
app.post('/api/thread', util.checkUser, (req, res)=>{
    console.log('new thread being created');
    model.thread.post(req.body, req.session.user.id, (data)=>{
        res.status(201).send(data);
    });
});

app.post('/api/messages', util.checkUser, (req, res)=>{
    console.log('server posting');
    model.messages.post(req.body, req.session.user.id, (data)=>{
        if(data.code === 201){

        }
        res.status(data.code).send(data);
    });
});


app.get('/api/messages/room/:id/', (req, res)=>{
    model.messages.get(req.params, (data)=>{
        res.status(201).send(data);
    });
});




//Login Routes
app.route('/login')
    .post((req, res)=>{
        model.user.login(req.body, (data)=>{
            if(data.code === 200){
                console.log('creating user session', data.user);
                util.createSession(req, res, data.user);
                res.status(data.code).send(data);
                //the user has been checked, the session has been created and the cookie has been delivered to the user's browser
            } else {
                //if not, sendback error message
                res.status(data.code).send(data.success);
            }
        });
    })
    .delete((req, res)=>{
        console.log('logging user out...');
        req.session.destroy((data)=>{
            res.clearCookie('user', {path: '/'});
            res.status(201).send("You have been logged out.");
        });
    });
app.route('/api/user')
    .get(util.checkUser, (req, res)=>{
        res.status(203).send({
            user: {
                first_name: req.session.user.first_name,
                username: req.session.user.username,
                id: req.session.user.id
            }
        });
    })
    .post((req, res)=>{
        model.user.register(req.body, (data)=>{
            if(data.code === 200){
                util.createSession(req, res, data.user);
                res.status(data.code).send(data);
                //the user has been checked, the session has been created and the cookie has been delivered to the user's browser
            } else {
                //if not, sendback error message
                res.status(data.code).send(data);
            }
        });
    });
app.route('/api/user/events')
    .get((req, res)=>{
        model.user.events(req.session.user, (data)=>{
            res.status(202).send(data);
        });
    });


app.listen(port, ()=>{
    console.log(`Next Step Events is running ${port}`);
});