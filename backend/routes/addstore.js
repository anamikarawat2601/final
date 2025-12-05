const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../middleware/auth');

router.post('/', (req, res) => {
  console.log("addstore entered");
  const { name, rating, latitude, longitude } = req.body;

  if (!name || !rating || !latitude || !longitude) {
    return res.status(400).json({ message: "Enter all details" });
  }

  // ✅ Check if store already exists
  const sqlCheck = 'SELECT * FROM store WHERE name = ?';
  db.query(sqlCheck, [name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Store already exists" });
    }

    // ✅ Only insert if store does NOT exist
    const sqlInsert = 'INSERT INTO store (name, rating, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sqlInsert, [name, rating, latitude, longitude], (err2, insertResult) => {
      if (err2) {
        console.error('Insert error:', err2);
        return res.status(500).json({ message: "Error inserting store" });
      }

      const storeData = {
        store_id: insertResult.insertId,
        name,
        rating,
        latitude,
        longitude
      };

      const token = jwt.sign(storeData, process.env.JWT_SECRET, { expiresIn: '2h' });

      return res.status(201).json({
        message: 'Store added successfully',
        store: storeData,
        token
      });
    });
  });
});



module.exports = router;
