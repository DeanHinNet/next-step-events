var request = require('request');

var isLoggedIn = (req)=>{
    return req.session ? !!req.session.user : false;
}

exports.checkUser = (req, res, next)=>{
    console.log('checking user');
    if(!isLoggedIn(req)) {
        res.status(401).send('Please login to continue.');
    } else {
        next();
    }
}

exports.createSession = (req, res, user)=>{
    return req.session.user = {
        id: user.id,
        first_name: user.first_name
    }
}

   // return req.session.regenerate(()=>{
    //     //console.log('inside create user', user);
    //     req.session.user = user.id;
    //     //console.log('inside create', user.id);
    //   }); 

    // var createSession = (req, res, user)=>{
//     return req.session.user = {
//         id: user.id,
//         first_name: user.first_name
//     }
 
// }

