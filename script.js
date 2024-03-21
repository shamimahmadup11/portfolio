
const fs = require('fs'); // Import the 'fs' module (file system)
const http = require('http'); // Import the 'http' module (HTTP server)
const path = require('path'); // Import the 'path' module (file paths)
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express(); // Define Express app
const port = 3000; // Define port number

app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define POST route for sending emails
app.post('/send-email', (req, res) => {
    // Extract form data from request body
    const { name, email, message } = req.body;

    // Log received form data
    console.log('Received form data:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your Gmail email
            pass: 'your-password' // Your Gmail password or app-specific password
        }
    });

    // Define email options
    const mailOptions = {
        from: email,
        to: 'recipient-email@example.com', // Recipient's email
        subject: 'New message from your portfolio website',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
