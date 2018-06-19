var express = require('express');
var bodyParser = require('body-parser');

var model = require('./../database/models/index.js');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client-react/dist/'));

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

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Next Step Events is running`);
});