var request = require('request');
var compression = require('compression');
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
        first_name: user.first_name,
        username: user.username
    }
}
exports.shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
  }