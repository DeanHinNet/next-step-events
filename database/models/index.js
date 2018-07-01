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
        post: (params, userId, callback) => {
            //adding to the 'events' collection a single event
            console.log("creating new event", userId);
            // var queryStr = `INSERT INTO events (name, start_date, end_date, description, created_at, updated_at, user_id) VALUES ('${params.name}', '${params.startDate}', '${params.endDate}', '${params.description}', NOW(), NOW(), ${userId})`;
            var today = new Date();
            params = {
                created_at: today,
                updated_at: today,
                user_id: userId
            }
            console.log('insert params', params);

            var queryStr = `INSERT INTO events SET ?`;

            db.query(queryStr, params, (err, data)=>{
                if(err) throw err;
                callback(data);    
            });
        }
    },
    event: {
        get: (params, callback) => {
            var queryStr = `SELECT * FROM events WHERE id=${params.id}`;
            console.log('event.get', queryStr);
            db.query(queryStr, (err, data)=>{
                console.log('error', err);
                if(err) throw err;
                console.log('no error?');
                callback(err, data);
            });
        },
        post: () => {

        },
        //returns a list of all the rooms for the event
        rooms: {
            get: (params, callback)=>{
                console.log("getting api/event/:id/rooms");
                console.log('params', params);
                var queryStr = `SELECT * FROM rooms WHERE event_id=${params.id}`;
                var result = {};
                console.log('queryStr', queryStr);
                db.query(queryStr, (err, data)=>{
                    console.log('rooms data join', data);
                    if(err) throw err;
                    result.rooms = data;
                    console.log('before module', params);
                    module.exports.event.get(params, (err, data)=>{
                        if(err) throw err;
                        result.event = data;
                        console.log('result', result);
                        callback(result);
                    })
                    
                });
            }
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
        post: (params, userId, callback)=>{
            var now = new Date();
            var queryStr =`INSERT INTO rooms (name, event_id, user_id, created_at, updated_at) VALUES ('${params.name}', ${params.event_id}, ${userId}, NOW(), NOW())`;
            
            // var queryStr =`INSERT INTO rooms SET ?`;
            
            console.log('rooms post', queryStr);
            console.log('params', params)
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                // queryStr = `SELECT * FROM rooms WHERE event_id=${params.event_id}`;
                // console.log('rooms post params,', params);
                // console.log(queryStr);
                // db.query(queryStr, (err, data)=>{
                //     if(err) throw err;
                //     callback(data);
                // });
                console.log("fiished insert room, getting event/rooms");
                console.log('heres the id', params);
                module.exports.event.rooms.get({id: params.event_id}, (result)=>{
                    callback(result);
                });
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
            console.log('thread get params', params);
            var queryStr = `SELECT * FROM threads WHERE id=${params.id}`;
            var result = {};

            console.log('threads query', queryStr);
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                console.log('threads results)', data);

                result.thread = data;
                // queryStr = `SELECT * FROM messages WHERE thread_id=${params.id}`;
                queryStr = `SELECT messages.id, messages.user_id, messages.content, messages.thread_id, messages.parent_id, messages.created_at, users.username FROM messages JOIN users ON messages.user_id=users.id WHERE messages.thread_id = ?`;

                db.query(queryStr, params.id, (err, data)=>{
                    if(err) throw data;
                    console.log('thread->messages results', data);
                    result.messages = data;

                    callback(result);
                });
            });
        },
        post: (params, userId, callback)=>{
            var queryStr = `INSERT INTO threads SET ?`;
            var today = new Date();
            params.user_id = userId;
            params.created_at = today;
            params.updated_at = today;
            console.log('thread post query', queryStr);
            console.log('params', params);
            db.query(queryStr, params, (err, data)=>{
                if(err) throw err;
                queryStr = `SELECT * FROM threads WHERE room_id=?`;
                console.log('getting new threads');            
                db.query(queryStr, params.room_id, (err, data)=>{
                    if(err) throw err;
                   callback(data);
                });
            });
        }
    },
    messages: {
        get: (params, callback)=>{
            //collect all the threads for the room
            //add the messages to each room
            var queryStr = `SELECT`;

            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                callback(data);
            });
        },
        post: (params, userId, callback)=>{
            var queryStr = `INSERT INTO messages SET ?`;
            var result = {};
            var today = new Date();
           
            params.created_at = today;
            params.updated_at = today;
            params.user_id = userId;
            delete params.error;
            console.log('messages post params', params);
            db.query(queryStr, params, (err, data)=>{
                console.log('messages data', data);
                console.log('thread id', params.thread_id);
                console.log('messages:', );
                if(err) throw err;

                module.exports.thread.get({id: params.thread_id}, (data)=>{
                    console.log('here are the new messages:', data);
                    result = {
                        messages: data.messages,
                        message: 'You message has been added.',
                        code: 201,

                    }
                    callback(result);
                })
                
            })
        }
    },
    user: {
        get: (params, callback)=>{

        },
        login: (params, callback)=>{
            //check if user is in the database
            //if yes, check if the password matches

            var queryStr = `SELECT * FROM users WHERE email=?`;
            console.log('login query for email', queryStr);
            console.log('params.email', params.email);
            db.query(queryStr, params.email, (err, data)=>{
                if(err){
                    console.error('error occurred');
                    callback({'code': 400, 'failed' : 'error ocurred'});
                } else {
                    console.log('logged in data', data);
                    console.log('data.length', data.length);
                    if(data.length>0){
                        if(data[0].password === params.password){
                            callback({'code': 200, 'message': 'login successful', 'user': data[0]});
                        } else {
                            callback({'code': 204, 'message': 'Email and password does not match.'});
                        }
                    } else {
                        callback({'code': 204, 'message': 'Email does not exist.'});
                    }
                }
                
            });
        },
        register: (params, callback)=>{
            console.log('model.user.registering...', params);

            var today = new Date();
            var user = {
                'first_name': params.first_name,
                'last_name': params.last_name,
                'username': params.username,
                'email': params.email,
                'password': params.password,
                'created_at': today,
                'updated_at': today
            };
            //check if email already exists;
            var queryStr = `SELECT * FROM users WHERE email=?`;
            db.query(queryStr, user.email, (err, data)=>{
                if(err) throw err;
                if(data.length === 0){
                    queryStr = `INSERT INTO users SET ?`;
                    db.query(queryStr, user, (err, data)=>{
                        console.log('user info after insert', data);
                        if(err) throw err;
                        console.log({'code': 200, 'message': 'User has been created!', 'user': {id: data.insertId, 'name': user.first_name}});
                        callback({'code': 200, 'message': 'User has been created!', 'user': {id: data.insertId, 'name': user.first_name}});
                    });
                } else {
                    callback({'code': 204, 'message': 'Email already exists!'});
                }
            });

            //if email doesn't exist, insert into database
           
        }
    }
   
}