const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Passwords = require('../utils/Passwords.js');
const Config = require('../config.js');

function authenticate(req, res, next) {

    let user = User;
	user.id = req.body.id;
    user.password = req.body.password || 'foo';

    if (Passwords.checkPasswd(user.id, user.password)) {
        user.authenticated = true;
        const token = jwt.sign(user, Config.secret, {
            expiresIn: Config.tokenExpiration
        });

        // return the information including token as JSON
        res.json({
            success: true,
            message: 'Your token is valid for ' + Config.tokenExpiration,
            token: token
        });
    } else {
        res.json({ success: false, message: 'Authentication failed.' });
    }
}

module.exports = authenticate;