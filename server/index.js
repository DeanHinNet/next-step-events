var express = require('express');
var bodyParser = require('body-parser');

var model = require('./../database/models/index.js');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client-react/dist/'));

app.get('/api/events', (req, res)=>{
    model.events.get((data)=>{
        res.status(201).send(data);
    });
});

app.post('/api/events', (req, res)=>{
    model.events.post(req.body, (data)=>{
        res.status(201).send(data);
    });
});

//GET for a single event
app.get('/api/event/:id', (req, res)=>{
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
app.post('/api/rooms', (req, res)=>{
    model.rooms.post(req.body, (data)=>{
        res.status(201).send(data);
    });
});

//Returns the functionality for a particular room 
app.get('/api/room/:number');

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Next Step Events is running`);
});