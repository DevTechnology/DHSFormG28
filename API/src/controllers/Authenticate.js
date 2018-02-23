const pg = require('pg');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Passwords = require('../utils/Passwords.js');
const Config = require('../config.js');
const client = new pg.Pool();

function authenticate(req, res, next) {

    let user = User;
	user.id = req.body.id;
    user.password = req.body.password || 'foo';

    Passwords.checkPasswd(user.id, user.password, function(match) {
        if (match) {
            user.authenticated = true;
            const token = jwt.sign(user, Config.secret, {
                expiresIn: Config.tokenExpiration
            });
    
            user.jwt = token;
            user.password = "";

            // Query Role ID
            client.query('select g.user_id, g.role_id, r.role_name from g28formUsers g, g28formroles r where g.user_id = $1 and g.role_id = r.role_id', [user.id], (err, result) => {
                
                let role = result.rows[0].role_name;

                console.log('Role Name: ' + role);

                user.role_name = role;
            
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Your token is valid for ' + Config.tokenExpiration,
                    user: user
                });
            });
        } else {
            res.json({ success: false, message: 'Authentication failed.' })
        }
    });
}

module.exports = authenticate;