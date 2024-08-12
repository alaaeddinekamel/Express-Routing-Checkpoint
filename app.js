const express = require('express');
const app = express();
const path = require('path');

// Middleware to check if the request is during working hours
function checkWorkingHours(req, res, next) {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const hour = currentDate.getHours();

    // Check if it's Monday to Friday, 9 AM to 5 PM
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('<h1>Sorry, our web application is only available during working hours (Monday to Friday, from 9 AM to 5 PM).</h1>');
    }
}

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Use the working hours middleware for all routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
