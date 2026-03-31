const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

exports.createBooking = async (req, res) => {
    try {
        const { listingId, checkIn, checkOut } = req.body;
        
        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).json({ success: false, message: 'Listing not found' });

        const dateIn = new Date(checkIn);
        const dateOut = new Date(checkOut);
        
        if (dateIn >= dateOut) {
            return res.status(400).json({ success: false, message: 'Check-out date must be after check-in date' });
        }

        // Check for conflicting bookings
        const conflictingBooking = await Booking.findOne({
            listing: listingId,
            status: 'confirmed',
            $or: [
                { checkIn: { $lt: dateOut }, checkOut: { $gt: dateIn } }
            ]
        });

        if (conflictingBooking) {
            return res.status(400).json({ success: false, message: 'These dates are already booked!' });
        }

        const days = (dateOut - dateIn) / (1000 * 60 * 60 * 24);
        const totalPrice = days * listing.price;

        const newBooking = new Booking({
            listing: listingId,
            user: req.session.user._id,
            checkIn: dateIn,
            checkOut: dateOut,
            totalPrice
        });

        await newBooking.save();
        res.status(201).json({ success: true, message: 'Booking Confirmed!', booking: newBooking });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.session.user._id })
            .populate('listing')
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: 'Not found' });
        
        if (booking.user.toString() !== req.session.user._id && req.session.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        booking.status = 'cancelled';
        await booking.save();
        
        res.json({ success: true, message: 'Booking cancelled successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
