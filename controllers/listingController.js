const Listing = require('../models/Listing');

exports.getAllListings = async (req, res) => {
    try {
        let query = {};
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { location: { $regex: req.query.search, $options: 'i' } }
            ];
        }
        if (req.query.minPrice) query.price = { ...query.price, $gte: Number(req.query.minPrice) };
        if (req.query.maxPrice) query.price = { ...query.price, $lte: Number(req.query.maxPrice) };
        if (req.query.category) query.category = req.query.category;

        const listings = await Listing.find(query).populate('provider', 'name');
        res.json({ success: true, listings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.postCreate = async (req, res) => {
    try {
        const { title, description, price, location, amenities, category } = req.body;
        const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

        const newListing = new Listing({
            title, description, price, location,
            category: category || "",
            amenities: typeof amenities === 'string' ? amenities.split(',').map(a => a.trim()) : amenities,
            images,
            provider: req.session.user._id
        });

        await newListing.save();
        res.status(201).json({ success: true, message: 'Listing created successfully', listing: newListing });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating listing' });
    }
};

exports.getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('provider', 'name email');
        if (!listing) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, listing });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.putEdit = async (req, res) => {
    try {
        const { title, description, price, location, amenities } = req.body;
        let listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ success: false, message: 'Not found' });

        if (listing.provider.toString() !== req.session.user._id && req.session.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        listing.title = title || listing.title;
        listing.description = description || listing.description;
        listing.price = price || listing.price;
        listing.location = location || listing.location;
        if (amenities) listing.amenities = typeof amenities === 'string' ? amenities.split(',').map(a => a.trim()) : amenities;
        if (req.files && req.files.length > 0) listing.images = req.files.map(f => `/uploads/${f.filename}`);

        await listing.save();
        res.json({ success: true, message: 'Listing updated successfully', listing });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating listing' });
    }
};

exports.deleteListing = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ success: false, message: 'Not found' });

        if (listing.provider.toString() !== req.session.user._id && req.session.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        await listing.deleteOne();
        res.json({ success: true, message: 'Listing removed' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
