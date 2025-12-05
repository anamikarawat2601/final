const express=require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt'); 


// Password validation function
function validatePassword(password) {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}



// -------------------- Signup Route --------------------
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username && !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if(!username){
    return res.status(400).json({error:"username is required"});
  }
  if(!password){
    return res.status(400).json({error:"password is required"});
  }

  // Username validation
  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  }

  // Password validation
  if (!validatePassword(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character'
    });
  }

  // Check if username exists
  const checkUserSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserSql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    try {
      // Hash password and insert
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(insertUserSql, [username, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ message: 'User signed up successfully' });
      });
    } catch (hashErr) {
      res.status(500).json({ error: 'Password hashing failed' });
    }
  });
});
module.exports=router;