const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).select('-password');
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        const existingEmail = await User.findOne({ email, _id: { $ne: req.session.user._id } });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.session.user._id,
            { name, email },
            { new: true }
        ).select('-password');

        req.session.user = updatedUser; // Update session
        res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'New passwords do not match' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }

        const user = await User.findById(req.session.user._id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect current password' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ success: true, message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
