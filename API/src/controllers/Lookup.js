const pg = require('pg');
const client = new pg.Pool();

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
function lookup_controller(req, res, next) {

    /**
     * Look up Role List.
     */
        try {
            client.connect((err, client, done) => {
                if(err) {
                    console.log(err);
                    done();
                }

                try {
                    // Select Roles Data
                    client.query('SELECT role_id, role_name, role_description, admin_role_secret from g28formroles', (ex, result) => {
                    done();

                    if (ex) {
                        console.log('**Error -> ' + JSON.stringify(ex));
                    } else {
                        console.log('Retreived Password for -->' + JSON.stringify(result));
                        res.send(JSON.stringify(result));
                    }
            });
        } catch
            (e)
            {
                console.log('Unexpected exception running database query: ' + JSON.stringify(e));
            }
        });
        } catch (e) {
            console.log('Failed to connect to PostgreSQL: ' + JSON.stringify(e));
    //        cb(null);
        }
//    }
};

module.exports = lookup_controller;