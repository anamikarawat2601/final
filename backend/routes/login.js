const express=require('express')
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');


//================authentication using jwt tokens:
const jwt = require('jsonwebtoken');
require('dotenv').config();  // to use JWT_SECRET from .env









// -------------------- Login Route --------------------
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Validate request
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

  // Find user in database
  const findUserSql = 'SELECT * FROM users WHERE username = ?';
  db.query(findUserSql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];
    console.log("user",user);

    try {
      // Compare plaintext password with hashed password in DB
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'password is incorrect' });
      }

      // ✅ Password matched — create JWT token
      const payload = { id: user.user_id, username: user.username };
      console.log("----------payload",payload);
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      // Password matched
       res.json({
        message: 'Login successful',
        username: user.username,
        token: token
      });
    } catch (compareErr) {
      console.error(compareErr);
      res.status(500).json({ error: 'Error verifying password' });
    }
  });
});
module.exports=router;