var express = require('express');
var eventsRouter = express.Router();
var model = require('./../../database/models/index.js'); 
var util = require('./../utility.js');

eventsRouter.get('/', (req, res)=>{
    model.events.get((data)=>{
        res.status(201).send(data);
    });
});
eventsRouter.post(util.checkUser,(req, res)=>{
    model.events.post(req.body, req.session.user.id, (data)=>{
        res.status(201).send(data);
    });
});
 //GET for a single event
 eventsRouter.get('/:id', (req, res)=>{
    model.event.get(req.params, (data)=>{
         res.status(201).send(data);
    });
});
//GETS the info for all the rooms of a particular event
eventsRouter.get('/:id/rooms', (req, res)=>{
    console.log('getting room');
    model.event.rooms.get(req.params, (data)=>{
        res.status(201).send(data);
    });
});

module.exports = eventsRouter;