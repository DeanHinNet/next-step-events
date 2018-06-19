var express = require('express');
var bodyParser = require('bodyParser');

var model = require('./../models/index.js');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/events', (req, res)=>{
    model.events.get((data)=>{
        res.status(201).send(data);
    });
});

app.post('/events', (req, res)=>{
    model.events.post(req.body, (data)=>{
        res.status(201).send(data);
    });
});

app.listen(process.env.PORT || 7777, ()=>{
    console.log(`Next Step Events is running`);
});