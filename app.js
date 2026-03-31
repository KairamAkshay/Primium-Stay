require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('express-flash');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Enable CORS for Next.js Frontend
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

// Session Configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallback_secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: 'sessions'
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
);

// Global Variables Middleware
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Routes
app.use('/', require('./routes/index')); // Home
app.use('/auth', require('./routes/auth'));
app.use('/listings', require('./routes/listings'));
app.use('/bookings', require('./routes/bookings'));
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/dashboard', require('./routes/dashboard'));

// 404 Handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
