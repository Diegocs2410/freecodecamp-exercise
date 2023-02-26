const { createUser, getAllUsers } = require('../controllers/user')
const router = require('express').Router()

router.route('/users').post(createUser).get(getAllUsers)

module.exports = router