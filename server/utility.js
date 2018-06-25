var request = require('request');


exports.checkUser = () => {
    
}

exports.createSession = (req, res, params)=>{
    return req.session.regenerate(()=>{
        req.session.user.id = params.id;
        req.session.user.name = params.name;
    });
}