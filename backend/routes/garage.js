const express=require('express');
const router=express.Router();

const db=require('../db');
const auth=require('../middleware/auth');

// ===================== GET STORE DETAILS (protected) =====================
router.get('/getdetails', auth, (req, res) => {
  console.log("we are in get method of storeadd");
  const {name} = req.user;
  const sql = 'SELECT * FROM store WHERE name = ?';
  db.query(sql, [name], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json({
      message:"we are in get store details",
       data: results[0] });
  });
});

//=====================================================get pending requestessss=================;
router.get('/pendingdetails/:store_id/', (req,res)=>{
    const { store_id } = req.params;
    console.log("store_id",store_id);
    const sql = `SELECT * FROM booking WHERE store_id=? && status="pending";`
    db.query(sql, [store_id], (err, results)=>{
        if(err){
          console.log(err);
             return res.status(500).json({error:"Database error"});}
        console.log("result=>",results);
        res.json(results);
    });
});
// garage will update the request is accepted or rejected
router.put('/update/:booking_id',(req, res) => {
    console.log("we are in update route");
  const { booking_id } = req.params;
  const { status } = req.body; // expected: "accepted" or "rejected"

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const sql = `UPDATE booking SET status = ?, updated_at = NOW() WHERE booking_id = ?;`;

  db.query(sql, [status, booking_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: `Booking ${status} successfully.` });
  });
});

/////////


module.exports=router;