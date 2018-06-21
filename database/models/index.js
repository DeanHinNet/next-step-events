var db = require('./../../database/index.js');
var axios = require('axios');

db.connect();

module.exports = {
    events: {
        get: (callback) => {
            var queryStr = `SELECT * FROM events`;
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                callback(data);
            });
        },
        post: (params, callback) => {
            //adding to the 'events' collection a single event
            var queryStr = `INSERT INTO events (name, start_date, end_date, description, created_at, updated_at, user_id) VALUES ('${params.name}', '${params.startDate}', '${params.endDate}', '${params.description}', NOW(), NOW(), ${params.userId})`;

            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                callback(data);    
            });
        }
    },
    event: {
        get: (params, callback) => {
            var queryStr = `SELECT * FROM events WHERE id=${params.id}`;
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                callback(data);
            });
        },
        post: () => {

        }
    },
    rooms: {
        get: (callback) => {
            var queryStr = `SELECT * FROM rooms`;
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                callback(data);
            });
        }
    },
    room: {

    },
    thread: {

    },
    message: {

    },
    user: {
        get: (params, callback)=>{

        },
        post: (params, callback)=>{

        }
    },
}