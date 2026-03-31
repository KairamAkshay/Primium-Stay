const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { ensureAuthenticated } = require('../middleware/auth');

// View user's bookings
router.get('/', ensureAuthenticated, bookingController.getUserBookings);

// Create new booking
router.post('/', ensureAuthenticated, bookingController.createBooking);

// Cancel booking
router.post('/cancel/:id', ensureAuthenticated, bookingController.cancelBooking);

module.exports = router;
