const pg = require('pg');
const Config = require('../config.js');
const client = new pg.Pool();


function getRoles(req, res, next) {
    try {

        // Connect to PostgreSQL
        client.connect((err, client, done) => {
            if(err) {
                console.log(err);
                done();
                return res.status(500).json({success: false, data: err});
            }

            // Insert User Account Data
            client.query('SELECT role_name from g28formroles order by role_name desc', (err, result) => {

                done();

                if (err) {
                    console.log('*** ERROR -> ' + JSON.stringify(err));
                    res.status(500).json({success: false, message: JSON.stringify(err)});
                } else {
                    res.status(200).json({ success: true, roles: result.rows });
                } 
            });
        });
    } catch(e) {
        console.log('Unexpected Error: ' + JSON.stringify(e));
        res.status(500).json({ success: false, message: 'Account Creation Failed' });
    }
}

module.exports = getRoles;