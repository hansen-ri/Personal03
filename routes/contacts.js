const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
// Personal02 fix was to include "/contacts" in each router...
router.get('/contacts', contactsController.getAll);

router.get('/contacts/:id', contactsController.getSingle);

router.post('/contacts', contactsController.postContact);

router.put('/contacts/:id', contactsController.updateContact);

router.delete('/contacts/:id', contactsController.deleteContact);

module.exports = router;