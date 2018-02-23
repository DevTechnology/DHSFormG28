const pg = require('pg');
const Config = require('../config.js');
const client = new pg.Pool();


function getRoles(req, res, next) {
    console.log('Getting Roles');
    client.connect((err, client, done) => {
        if(err) {
            console.log(err);
            done();
            return res.status(500).json({success: false, data: err});
        }

        const {dbResponse} = client.query('SELECT * from g28formRoles', function (err, dbResponse) {
            if (err) {
                res.status(500).json({success: false, message: JSON.stringify(err)});
            } else {
                console.log('Successfully Created Account!');
                res.status(200).json({success: true, roles: dbResponse});
            }
        });
        
        res.send(res)
    });
}