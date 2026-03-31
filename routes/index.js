const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Home page showing featured/latest listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find().populate('provider').sort({ createdAt: -1 }).limit(6);
        res.render('home/index', { listings });
    } catch (err) {
        console.error(err);
        res.render('home/index', { listings: [] });
    }
});

module.exports = router;
