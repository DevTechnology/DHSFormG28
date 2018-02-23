const express = require('express');
const router = express.Router();

const authenticate = require('../controllers/Authenticate');
const create_account = require('../controllers/CreateAccount');
const get_roles = require('../controllers/Roles.js')

router.post('/authenticate', authenticate);
router.post('/create-account', create_account);
router.get('/roles', get_roles);

module.exports = router;