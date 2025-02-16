const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors()); // Allow cross-origin requests

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Change if necessary
    user: 'root', // Replace with your MySQL username
    password: 'Gurukumari', // Replace with your MySQL password
    database: 'blooddetails' // Updated database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query to find the user by username
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user: ' + err);
        }
        if (results.length > 0) {
            const user = results[0];
            // Compare the provided password with the hashed password in the database
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (passwordIsValid) {
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Invalid password');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

// Signup route
app.post('/signup', (req, res) => {
    const { username, password, loginType } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Insert user into the database
    const query = 'INSERT INTO users (username, password, loginType) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, loginType], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).send('Error registering user: ' + err);
        }
        res.status(200).json({ success: true, message: "Signup successful! Redirecting to login..." });

    });
});
app.post('/place-order', (req, res) => {
    const { bloodType, numOfBags, transfusionType, bloodGroup, landmark, mobileNumber, dateOfCollection } = req.body;

    const query = `
        INSERT INTO orders (bloodType, numOfBags, transfusionType, bloodGroup, landmark, mobileNumber, dateOfCollection)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [bloodType, numOfBags, transfusionType, bloodGroup, landmark, mobileNumber, dateOfCollection], (err, result) => {
        if (err) {
            console.error('Error placing order:', err);
            return res.status(500).send('Error placing order: ' + err);
        }
        res.status(200).send('Order placed successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


