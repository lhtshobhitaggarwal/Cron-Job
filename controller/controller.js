import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET;

export function login(req, res) {
    const user = { username: 'demoUser', role: 'admin' };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
}

export function secureData(req, res) {
    res.json({ message: 'Secure data access granted!', user: req.user });
}
