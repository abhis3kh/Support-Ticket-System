const express = require('express');
const router = express.Router();
// bringing controller function
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
// calling the controller function it will handle all the logic part of the process.
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
