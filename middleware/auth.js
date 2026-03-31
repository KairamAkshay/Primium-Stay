module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.session && req.session.user) {
            return next();
        }
        res.status(401).json({ success: false, error: 'Please log in' });
    },
    ensureProvider: function(req, res, next) {
        if (req.session && req.session.user && (req.session.user.role === 'provider' || req.session.user.role === 'admin')) {
            return next();
        }
        res.status(403).json({ success: false, error: 'Not authorized as provider' });
    },
    ensureAdmin: function(req, res, next) {
        if (req.session && req.session.user && req.session.user.role === 'admin') {
            return next();
        }
        res.status(403).json({ success: false, error: 'Not authorized as admin' });
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.session || !req.session.user) {
            return next();
        }
        res.status(400).json({ success: false, error: 'Already logged in' });
    }
};
