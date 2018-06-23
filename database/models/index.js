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
        },
        post: (params, callback)=>{
            var queryStr =`INSERT INTO rooms (name, event_id) VALUES (${params.name}, ${params.event_id})`;
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                callback(data);
            })
        }
    },
    room: {
        get: (params, callback)=>{
            console.log('params', params);
            var queryStr = `SELECT * FROM rooms WHERE id=${params.id}`;
            var result = {};
            console.log('room query', queryStr);
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                result.room = data[0];

                queryStr = `SELECT * FROM threads WHERE room_id=${params.id}`;
                console.log('room data', data);

                db.query(queryStr, (err, data)=>{
                    if(err) throw err;
                    result.threads = data;

                    // queryStr = `SELECT * FROM rooms_has_users WHERE room_id=${params.id}`;
                    queryStr = `SELECT users.name FROM rooms_has_users JOIN users ON rooms_has_users.user_id=users.id JOIN rooms ON rooms_has_users.room_id=rooms.id WHERE rooms.id=${result.room.id}`;
                    console.log('members', queryStr);

                    db.query(queryStr, (err, data)=>{
                        if(err) throw err;
                        result.members = data;
                        
                        console.log('room event_id', JSON.stringify(result.room.event_id));
                        queryStr = `SELECT * FROM events WHERE id=${result.room.event_id}`;
                       
                        db.query(queryStr, (err, data)=>{
                           
                            if(err) throw err;  
                            result.event = data[0];

                            callback(result);
                        });
                    });
                });
            });


            // db.query(queryStr, (err, data)=>{
            //     console.log('query data', data);
            //     if(err) throw err;
            //     callback(data);
            // });
        },

    },
    thread: {
        get: (params, callback)=>{
            console.log('params', params.id);
            var queryStr = `SELECT * FROM threads WHERE id=${params.id}`;
            var result = {};

            console.log('threads query', queryStr);
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                console.log('threads results)', data);

                result.thread = data;
                queryStr = `SELECT * FROM messages WHERE thread_id=${params.id}`;

                db.query(queryStr, (err, data)=>{
                    if(err) throw data;
                    console.log('messages results', data);
                    result.messages = data;

                    callback(result);
                });
            });
        },
        post: ()=>{

        }
    },
    message: {
        get: (params, callback)=>{
            //collect all the threads for the room
            //add the messages to each room
            var queryStr = `SELECT`;

            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                callback(data);
            });
        }
    },
    user: {
        get: (params, callback)=>{

        },
        post: (params, callback)=>{
            //check if user is in the database
            //if yes, check if the password matches

            var queryStr = `SELECT password FROM users WHERE email=${params.email}`;

            console.log('login query for email', queryStr);

            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                
            });
        }
    },
}