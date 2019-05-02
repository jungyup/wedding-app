const express = require('express');
const bodyParser = require('body-parser');

const rsvpController = require('./controllers/rsvp_controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

// Search by name
app.get('/rsvps', rsvpController.getRsvps);

// Update confirmation
app.post('/rsvp', rsvpController.createRSVP);

// Update guest for certain name
app.post('/guest', rsvpController.createGuest);

app.listen('1005');