const express=require('express');
const router = express.Router();
const db = require('../db');
const auth=require('../middleware/auth');

router.post('/',auth,(req,res)=>{
  const user_id=req.user.id;
    const {store_id,vehicle_type,service_type,booking_date,booking_time}=req.body;
    if(!user_id || !store_id || !vehicle_type || !service_type|| !booking_date ||   !booking_time){
         return res.status(400).json({ error: "Missing required fields" });
    }
    const sqlquery='INSERT INTO booking (user_id,store_id,vehicle_type,service_type,booking_date,booking_time) VALUES(?,?,?,?,?,?)';
    db.query(sqlquery,[user_id,store_id,vehicle_type,service_type,booking_date,booking_time],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
       return res.status(201).json({
      message: "Booking successfully created",
      booking_id: result.insertId
    });
        
    
    })

});
router.get('/track/:booking_id',auth,(req,res)=>{
    const {booking_id}=req.params;
    const sqlquery='SELECT status FROM booking WHERE booking_id=? ';
    db.query(sqlquery,[booking_id],(err,result)=>{ 
        if(err){
            return res.status(500).json({error:"database error"});
        }
        
        return res.status(201).json({result});
    })
});

//
// GET all bookings for a user
router.get('/track/history/:user_id', (req, res) => {
  const { user_id } = req.params;

  const sql = `SELECT * FROM booking WHERE user_id = ? ORDER BY created_at DESC`;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No bookings found for this user" });
    }

    res.json(results);
  });
});





module.exports=router; 