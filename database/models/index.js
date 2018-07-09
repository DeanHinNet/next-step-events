var db = require('./../../database/index.js');
var axios = require('axios');
var credentials = process.env.host;
var bcrypt = require('bcryptjs');
const saltRounds = 6;
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

if(credentials === undefined) {
    credentials = require('./../../config.js');
} else {
    credentials = {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        event_brite_key: process.env.event_brite_key
    }
}

db.connect();

module.exports = {
    sessionStore: new MySQLStore({}, db),
    eventBrite: {
        event: {
            get: (params, callback)=>{
                console.log('axios.get', credentials);
                axios.get(`https://www.eventbriteapi.com/v3/events/${params.id}/?token=${credentials.event_brite_key}
                `)
                .then((data)=>{
                    callback(data);
                })
                .catch((err)=>{
                    console.log('there has been an error', err);
                });
            }
        },
        get: (callback)=>{
            axios.get(`https://www.eventbriteapi.com/v3/events/search/?token=${credentials.event_brite_key}&location.address=new%20york%20city&categories=101`)
            .then((data)=>{
                var results = [];
                var entry = {};
                //get only info I need to reduce load on request
                data.data.events.slice(0, 10).map((event)=>{
                    entry = {
                        id: event.id,
                        name: event.name.text,
                        description: event.description.text,
                        start_date: event.start.local,
                        end_date: event.end.local,
                        logo: event.logo
                    }
                    results.push(entry);
                });
                callback(results);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    },
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
            var today = new Date();
            params = {
                created_at: today,
                updated_at: today,
                user_id: userId
            }
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
            
            db.query(queryStr, (err, data)=>{
                if(err) throw err;
                callback(err, data);
            });
        },
        //returns a list of all the rooms for the event
        rooms: {
            get: (params, callback)=>{
                //returns the list of rooms with the default thread if available
                var queryStr = `SELECT rooms.id, rooms.name, rooms.user_id, rooms.event_id, rooms.created_at, rooms.updated_at, threads.id AS thread_id FROM rooms LEFT OUTER JOIN threads ON rooms.id = threads.room_id WHERE event_id = ${params.id} GROUP BY rooms.id`;
                var result = {};

                db.query(queryStr, (err, data)=>{
                    if(err) throw err;
                    result.rooms = data;
                    
                    module.exports.event.get(params, (err, data)=>{
                        if(err) throw err;
                      
                        //when no event in the database is found, search eventbrite for the event with id, otherwise return event from database
                        if(data.length === 0){
                            module.exports.eventBrite.event.get(params,(data)=>{
                                result.event = {
                                    id: data.data.id,
                                    name: data.data.name.text,
                                    description: data.data.description.text,
                                    start_date: data.data.start.local,
                                    end_date: data.data.end.local
                                }
                                callback(result);
                            });
                        } else {
                            result.event = data;
                            callback(result);
                        }
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
            var queryStr =`INSERT INTO rooms SET ?`;
            var now = new Date();
            var updatedParams = {
                name: params.name,
                event_id: params.event_id,
                user_id: userId,
                created_at: now,
                updated_at: now
            };
            db.query(queryStr, updatedParams, (err, data)=>{
                if(err) throw err;
                module.exports.event.rooms.get({id: params.event_id}, (result)=>{
                    callback(result);
                });
            })
        }
    },
    room: {
        get: (params, callback)=>{
            var queryStr = `SELECT * FROM rooms WHERE id=?`;
            var result = {};
            db.query(queryStr, params.id, (err, data)=>{
                if(err) throw err;
                result.room = data[0];
                queryStr = `SELECT threads.id, threads.description, threads.created_at, users.username FROM threads JOIN users ON threads.user_id=users.id WHERE room_id=?`;
                db.query(queryStr, result.room.id, (err, data)=>{
                    if(err) throw err;
                    result.threads = data;
                    queryStr = `SELECT users.username FROM rooms_has_users JOIN users ON rooms_has_users.user_id=users.id JOIN rooms ON rooms_has_users.room_id=rooms.id WHERE rooms.id=?`;
                    db.query(queryStr, result.room.id, (err, data)=>{
                        if(err) throw err;
                        result.members = data;
                  
                        params = {
                            id: result.room.event_id
                        }
                        //need to split for eventbrite and for user-created...
                        
                        if(true){
                            module.exports.event.get(params, (err, data)=>{
                                if(err) throw err;
                                console.log('getting events data from database', data);
                                //when no event in the database is found, search eventbrite for the event with id
                                console.log('pre-eventbrite', params);
                                if(data.length === 0){
                                    module.exports.eventBrite.event.get(params,(data)=>{
                                        
                                        var logo;
                                        if(data.data.logo && data.data.logo.url){
                                            logo = data.data.logo.url;
                                        }
                                        result.event = {
                                            id: data.data.id,
                                            name: data.data.name.text,
                                            description: data.data.description.text,
                                            start_date: data.data.start.local,
                                            end_date: data.data.end.local,
                                            logo_url: logo
                                        }
                                        console.log('eventbrite get', result.event);
                                        callback(result);
                                    });
                                } else {
                                    result.event = data;
                                    console.log('result', result);
                                    callback(result);
                                }
                            })
                        } else {
                            //queryStr = `SELECT * FROM events WHERE id=${result.room.event_id}`;
                        }
                        
                    });
                });
            });
        },
    },
    thread: {
        get: (params, callback)=>{
            var queryStr = `SELECT * FROM threads WHERE id=?`;
            var result = {};
            db.query(queryStr, params.id, (err, data)=>{
                if(err) throw err;
                result.thread = data;
                queryStr = `SELECT messages.id, messages.user_id, messages.content, messages.thread_id, messages.parent_id, messages.created_at, users.username FROM messages JOIN users ON messages.user_id=users.id WHERE messages.thread_id = ?`;
                db.query(queryStr, params.id, (err, data)=>{
                    if(err) throw data;
                    result.messages = data;
                    callback(result);
                });
            });
        },
        post: (params, userId, callback)=>{
            console.log('creating new thread...',params);
            var queryStr = `INSERT INTO threads SET ?`;
            var today = new Date();
            var updatedParams = {
                user_id: userId,
                created_at: today,
                updated_at: today,

            }
            params.user_id = userId;
            params.created_at = 'NOW()';
            params.updated_at = 'NOW()';
            console.log('updated Params', updatedParams);

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
            var today = new Date();
            var updatedParams = {
                user_id: userId,
                created_at: today,
                updated_at: today,
                thread_id: params.thread_id,
                parent_id: params.parent_id,
                content: params.content
            }
            var result = {};
            db.query(queryStr, updatedParams, (err, data)=>{
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
        login: (params, callback)=>{
            //check if user is in the database
            //if yes, check if the password matches
            var queryStr = `SELECT id, first_name, username, password FROM users WHERE email=?`;
            var result = {};
            db.query(queryStr, params.email, (err, data)=>{
                if(err){
                    callback({'code': 400, 'failed' : 'error ocurred'});
                } else {
                    if(data.length>0){
                        result = {
                            first_name: data[0].first_name,
                            username: data[0].username,
                            id: data[0].id
                        }
                        bcrypt.compare(params.password, data[0].password, (err, res)=>{
                            if(err) throw err;
                            callback({'code': 200, 'message': 'login successful', 'user': result});
                        });
                    } else {
                        callback({'code': 204, 'message': 'Email does not exist.'});
                    }
                }
                
            });
        },
        register: (params, callback)=>{
            var queryStr = `SELECT * FROM users WHERE email=?`;
            var today = new Date();
            var user = {
                first_name: params.first_name,
                last_name: params.last_name,
                username: params.username,
                email: params.email,
                password: params.password,
                created_at: today,
                updated_at: today
            };

            //check if email already exists;
            db.query(queryStr, user.email, (err, data)=>{
                if(err) throw err;
                if(data.length === 0){
                     //if email doesn't exist, insert into database
                    bcrypt.genSalt(saltRounds, (err, salt)=>{
                        if(err) throw err;
                        bcrypt.hash(user.password, salt, (err, hash)=>{
                            if(err) throw err;
                            user.password = hash;
                            queryStr = `INSERT INTO users SET ?`;
                            db.query(queryStr, user, (err, data)=>{
                                if(err) throw err;
                                callback({'code': 200, 'message': 'User has been created!', 'user': {id: data.insertId, 'name': user.first_name}});
                            });
                        });
                    });
                } else {
                    callback({'code': 204, 'message': 'Email already exists!'});
                }
            });

           
        }
    }
   
}


