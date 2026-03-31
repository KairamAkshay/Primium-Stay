const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

// Admin only routes
router.get('/', ensureAuthenticated, ensureAdmin, userController.getAllUsers);
router.post('/role/:id', ensureAuthenticated, ensureAdmin, userController.updateRole);
router.delete('/:id', ensureAuthenticated, ensureAdmin, userController.deleteUser);

module.exports = router;
