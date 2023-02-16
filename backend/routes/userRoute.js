const express = require('express');
const router = express.Router();
// bringing controller function
const { registerUser, loginUser } = require('../controllers/userControllers');

// calling the controller function it will handle all the logic part of the process.
router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
