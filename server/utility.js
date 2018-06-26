var request = require('request');


exports.checkUser = () => {
    
}

exports.createSession = (req, res, params)=>{
    console.log('creating session');
    console.log('id', params.id);
    console.log('name', params.name);

    return req.session.regenerate(()=>{
        req.session.user = {
            id: params.id,
            name: params.name
        }
    });
}