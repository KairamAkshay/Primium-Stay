const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureProvider } = require('../middleware/auth');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');

// Provider Dashboard API
router.get('/', ensureAuthenticated, ensureProvider, async (req, res) => {
    try {
        const listings = await Listing.find({ provider: req.session.user._id });
        const listingIds = listings.map(l => l._id);
        
        const bookings = await Booking.find({ listing: { $in: listingIds } })
            .populate('listing')
            .populate('user')
            .sort({ createdAt: -1 });

        // Calculate analytics
        const totalListings = listings.length;
        const totalBookings = bookings.length;
        const totalEarnings = bookings.reduce((sum, b) => b.status === 'confirmed' ? sum + b.totalPrice : sum, 0);

        res.json({
            success: true,
            dashboard: { listings, bookings, totalListings, totalBookings, totalEarnings }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error loading dashboard' });
    }
});

module.exports = router;
