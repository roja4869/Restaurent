const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for reservations (for demonstration)
let reservations = [];

app.post('/api/bookings', (req, res) => {
    const { name, email, date, time, guests, phone } = req.body;
    
    if (!name || !email || !date || !time || !guests || !phone) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newBooking = {
        id: Date.now(),
        name,
        email,
        date,
        time,
        guests,
        phone,
        status: 'Confirmed'
    };

    reservations.push(newBooking);
    console.log('New Booking Received:', newBooking);

    res.status(201).json({ 
        success: true, 
        message: 'Your royal table has been reserved!',
        booking: newBooking
    });
});

app.get('/api/bookings', (req, res) => {
    res.json(reservations);
});

app.listen(PORT, () => {
    console.log(`Royal Spice Palace Backend running on http://localhost:${PORT}`);
});
