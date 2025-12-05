const express = require('express');
const router = express.Router();
const db = require('../db');

const auth= require('../middleware/auth');
/**
 * Get Profile
 */
router.get('/',auth, (req, res) => {    
  
  const username = req.user.username;
  console.log("username",req.user.username);

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ data: results[0] });
  });
});
//==============edit profile=============================using post method-======;

router.patch('/edit', auth, (req, res) => {

  const userId = req.user.id; // from JWT
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No fields provided for update" });
  }

  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);

    values.push(value);
  }
   
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`;
  values.push(userId);
  console.log("---------------------------->",sql,values);
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully" });
  });
});

module.exports=router;
