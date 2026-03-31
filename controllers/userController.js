const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { role } = req.body;
        const validRoles = ['user', 'provider', 'admin'];
        
        if (!validRoles.includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        await User.findByIdAndUpdate(req.params.id, { role });
        res.json({ success: true, message: 'User role updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.session.user._id) {
            return res.status(400).json({ success: false, message: 'You cannot delete yourself' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
