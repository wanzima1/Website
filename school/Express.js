const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Mock admin user (in a real app, this would be stored in a database)
const adminUser = {
  username: 'admin',
  // This is a hashed version of 'password123'
  passwordHash: '$2b$10$X7szZYtWCXZLvO3cVXjbT.j7kcJgGNvQqJsJPn9L6xq2PaWXDNQK2'
};

// Mock data (in a real app, this would come from a database)
const mockData = {
  overview: { students: 500, teachers: 50, classes: 30 },
  events: [
    { date: '2023-06-15', title: 'Summer Festival' },
    { date: '2023-07-01', title: 'Graduation Ceremony' },
  ]
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser.username && await bcrypt.compare(password, adminUser.passwordHash)) {
    req.session.isAuthenticated = true;
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
});

app.get('/api/admin/:section', isAuthenticated, (req, res) => {
  const { section } = req.params;
  res.json(mockData[section] || {});
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));