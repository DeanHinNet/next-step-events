var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var fallback = require('express-history-api-fallback');
var util = require('utility.js');
var model = require('./../database/models/index.js');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client-react/dist/'));
// app.use(fallback('index.html', __dirname + '/../client-react/dist/'));
app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}

}));

app.get('/api/events', (req, res)=>{
    model.events.get((data)=>{
        res.status(201).send(data);
    });
});

app.post('/api/events', util.checkUser, (req, res)=>{
    model.events.post(req.body, (data)=>{
        res.status(201).send(data);
    });
});

//GET for a single event
app.get('/api/events/:id', (req, res)=>{
   model.event.get(req.params, (data)=>{
        res.status(201).send(data);
   });
});

//Gets a list of all the rooms
app.get('/api/rooms', (req, res)=>{
    model.rooms.get((data)=>{
        res.status(201).send(data);
    });
});

//Creates a new room in the collection of rooms
app.post('/api/rooms', util.checkUser, (req, res)=>{
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

app.post('', ()=>{

});
app.get('/api/messages/room/:id/', ()=>{
    console.log('all ', req.params);
    model.messages.get(req.params, (data)=>{
        res.status(201).send(data);
    });
});
//Login Routes

app.post('/login',(req, res)=>{
   model.user.post(req.body, (data)=>{
        res.status(201).send(data)
   });
});

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Next Step Events is running`);
});