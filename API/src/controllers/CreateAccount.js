const pg = require('pg');
const Config = require('../config.js');
const User = require('../models/User');
const Passwords = require('../utils/Passwords.js');
const client = new pg.Pool();
const SALT = 10;

/**
 * Controller for creating new user accounts.  Note the requirement for the following
 * environment variables:
 * 
 * PGDATABASE
 * PGHOST
 * PGPASSWORD
 * PGPORT
 * PGUSER
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function create_account(req, res, next) {

    console.log("req.body: " + JSON.stringify(req.body));

    let user = User;
	user.id = req.body.id;
    user.password = req.body.password;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.rold_id = req.body.role.role_id;

    console.log('User -> ' + JSON.stringify(user));
    console.log('CONFIG VALUES -> ' + JSON.stringify(Config));

    try {

        // Encrypt Password
        const passWord = user.password.trim();
        console.log('Password to hash => ' + passWord);
        password_hash = Passwords.hashPassword(passWord, SALT);

        // Connect to PostgreSQL
        client.connect((err, client, done) => {
            if(err) {
                console.log(err);
                done();
                return res.status(500).json({success: false, data: err});
            }

            // Insert User Account Data
            client.query('select user_id from g28formusers ' +
                'where user_id = $1 or email_address = $2',
                [user.id, user.email], (err, result) => {
                    if (err) {
                        console.log(JSON.stringify(err));
                        res.status(500).json({success: false, message: JSON.stringify(err)});
                    } else {
                        console.log("***" + JSON.stringify(result));

                        if(result && result['rowCount'] > 0) {
                            res.status(507).json({success: false, message: "Account already exists."});
                        } else {
                            // Insert User Account Data
                            client.query('INSERT INTO g28formusers(user_id, password_hash, first_name, last_name, email_address, salt, role_id) values($1, $2, $3, $4, $5, $6, $7)',
                                [user.id, password_hash, user.first_name, user.last_name, user.email, SALT, user.rold_id], (err, result) => {

                                    done();

                                    if (err) {
                                        res.status(500).json({success: false, message: JSON.stringify(err)});
                                    } else {
                                        console.log('Successfully Created Account!');
                                        res.status(200).json({
                                            success: true,
                                            user_id: user.id,
                                            message: 'Account Created'
                                        });
                                    }
                                });
                        }
                    }
                });
        });
    } catch(e) {
        console.log('Unexpected Error: ' + JSON.stringify(e));
        res.status(500).json({ success: false, message: 'Account Creation Failed' });
    }
};

module.exports=create_account;