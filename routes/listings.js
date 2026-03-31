const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { ensureAuthenticated, ensureProvider } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', listingController.getAllListings);
router.post('/create', ensureAuthenticated, ensureProvider, upload.array('images', 5), listingController.postCreate);
router.get('/:id', listingController.getListing);
router.put('/:id', ensureAuthenticated, ensureProvider, upload.array('images', 5), listingController.putEdit);
router.delete('/:id', ensureAuthenticated, ensureProvider, listingController.deleteListing);

// Get Reserved Dates for a single Property
router.get('/:id/reserved-dates', listingController.getReservedDates);

module.exports = router;
