const express = require('express')
const router = express.Router()

router.get('/contacts', require('./contacts'))

router.get('/contacts/:id', require('./contacts'));

router.post('/contacts', require('./contacts'));

router.put('/contacts/:id', require('./contacts'));

router.delete('/contacts/:id', require('./contacts'));

// router.use('/Contacts', require('./contacts'));

module.exports = router