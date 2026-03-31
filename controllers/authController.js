const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.me = (req, res) => {
    if (req.session && req.session.user) {
        return res.json({ success: true, user: req.session.user });
    }
    return res.status(401).json({ success: false, message: 'Not authenticated' });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password' });

        req.session.user = { _id: user._id, name: user.name, email: user.email, role: user.role };
        req.session.save((err) => {
            if (err) return res.status(500).json({ success: false, message: 'Session error' });
            res.json({ success: true, user: req.session.user });
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.postRegister = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ success: false, message: 'Please enter all fields' });
    if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

        const validRole = ['user', 'provider'].includes(role) ? role : 'user';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword, role: validRole });
        await newUser.save();
        
        res.status(201).json({ success: true, message: 'Registered successfully', user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, message: 'Error logging out' });
        res.clearCookie('connect.sid'); // Assuming default connect-mongo cookie name
        res.json({ success: true, message: 'Logged out' });
    });
};
