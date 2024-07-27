const express = require('express');
const { register, login, getUser, updateUser } = require('../controller/userController.js');
const { protect } = require('../middleware/authmiddleware.js');
const router = express.Router();

console.log(`User route`);

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUser);
router.put('/profile', protect, updateUser);

module.exports = router;
