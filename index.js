require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

const SECRET_KEY = process.env.SECRET
app.use(express.json());

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token required' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            // Handle token expiration error specifically
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }

            // Handle all other token errors
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Token is valid
        req.user = user;
        next();
    });
}


// Route to generate token (for testing)
app.post('/login', (req, res) => {
    const user = { username: 'demoUser', role: 'admin' };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Protected route
app.get('/secure-data', authenticateToken, (req, res) => {
    res.json({ message: 'Secure data access granted!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
