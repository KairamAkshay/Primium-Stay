const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, profileController.getProfile);
router.post('/update', ensureAuthenticated, profileController.updateProfile);
router.post('/password', ensureAuthenticated, profileController.updatePassword);

module.exports = router;
